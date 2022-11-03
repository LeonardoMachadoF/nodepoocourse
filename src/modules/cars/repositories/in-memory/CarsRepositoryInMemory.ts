import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {

    async findByLicensePlate(license_plate: string): Promise<Car | void> {
        let car = this.cars.find(car => car.license_plate === license_plate);
        if (!car) {
            return;
        }
        return car;
    }

    cars: Car[] = [];
    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, license_plate, name })

        this.cars.push(car);
        return car;
    }

}