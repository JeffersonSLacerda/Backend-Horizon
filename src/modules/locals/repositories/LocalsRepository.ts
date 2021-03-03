import Locals from '../infra/typeorm/entities/Local';

class LocalsRepository {
  private locas: Locals[];

  constructor() {
    this.locas = [];
  }
}

export default LocalsRepository;
