import dayjs from 'dayjs';
import { AppError } from "../../../errors/AppError";
import { DayjsDateProvider } from '../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const nowPlus24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            car_id: '12345',
            user_id: '112223',
            expected_return_date: nowPlus24Hours
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should NOT be able to create a new rental if there is another rental open to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '112223',
                expected_return_date: nowPlus24Hours
            });
            await createRentalUseCase.execute({
                car_id: '1234523',
                user_id: '112223',
                expected_return_date: nowPlus24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT be able to create a new rental if there is another rental open to the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '112223',
                expected_return_date: nowPlus24Hours
            });
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '112321223',
                expected_return_date: nowPlus24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT be able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '112321223',
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})