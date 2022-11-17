import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental | undefined> {
        const rental = new Rental()
        Object.assign(rental, {
            car_id, expected_return_date, user_id, start_date: new Date()
        })
        this.rentals.push(rental)

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
    }

}