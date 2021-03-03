import { getRepository } from 'typeorm';

import Locals from '../infra/typeorm/entities/Local';
import Operations from '../infra/typeorm/entities/Operations';
import Pictures from '../infra/typeorm/entities/Pictures';
import Tags from '../infra/typeorm/entities/Tags';

interface Request {
  city: string;
  state: string;
  name: string;
  tag: string[];
  description: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  rating: number;
  link?: string;
  rootOrNutella: boolean;
  showName: boolean;
  status: 'ok' | 'waiting' | 'refused';
  days: 'sun' | 'mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat';
  openTime: string;
  closeTime: string;
  price?: number;
  pictures: string[];
}

interface Tag {
  name: string;
}

class CreateLocalService {
  public async execute({
    city,
    state,
    name,
    tags,
    description,
    cep,
    street,
    number,
    district,
    rating,
    link,
    rootOrNutella,
    showName,
    status,
    days,
    openTime,
    closeTime,
    price,
    pictures,
  }: Request): Promise<void> {
    const localsRepository = getRepository(Locals);

    const operationsRepository = getRepository(Operations);

    const picturesRepository = getRepository(Pictures);

    const tagsRepository = getRepository(Tags);

    const checkLocalsExistAndAceppted = await localsRepository.findOne({
      where: { name, status: 'ok' },
    });

    if (checkLocalsExistAndAceppted) {
      throw new Error('Local ja cadastrado!');
    }

    const checkLocalsExistAndWaiting = await localsRepository.findOne({
      where: { name, staus: 'waiting' },
    });

    if (checkLocalsExistAndWaiting) {
      throw new Error('Local ja cadastrado e esperando aprovação!');
    }

    // percorrer o array de tags,
    // salvar todas no banco no banco

    const localTags = tags.forEach((tag: Tag) => {
      tagsRepository.create(tag);
    });
  }
}

export default CreateLocalService;
