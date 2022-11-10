import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
    async findById(car_id: string): Promise<Car | null> {
        let car = this.cars.find(car => car.id === car_id);
        if (!car) {
            return null;
        }
        return car;
    }

    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id })

        this.cars.push(car);
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        let availableCars = this.cars.filter(car => car.available === true);

        if (brand || category_id || name) {
            availableCars = availableCars.filter(car => (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name))
        };

        return availableCars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | null> {
        let car = this.cars.find(car => car.license_plate === license_plate);
        if (!car) {
            return null;
        }
        return car;
    }

}