import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../typeorm/entities/Car";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }
    async findById(car_id: string): Promise<Car | null> {
        return await this.repository.findOne({ where: { id: car_id } });
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", { available: true })
        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        };
        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        let cars = await carsQuery.getMany()
        return cars;
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        let newCar = this.repository.create({ name, brand, category_id, daily_rate, description, fine_amount, license_plate, specifications, id })
        await this.repository.save(newCar);
        return newCar;

    }
    async findByLicensePlate(license_plate: string): Promise<null | Car> {
        let car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }
}