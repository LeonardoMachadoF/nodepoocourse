import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase"

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
const exampleCar = {
    name: 'Test Car',
    brand: 'Test Brand',
    daily_rate: 30,
    description: 'Test Description',
    fine_amount: 30,
    license_plate: '222033',
    category_id: 'category'
}

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })

    it('Should be able to create a new Car', async () => {
        const car = await createCarUseCase.execute(exampleCar);
        expect(car).toHaveProperty('id');
    })

    it('Should not be able to create a car with existign license_plate', async () => {
        expect(async () => {
            await createCarUseCase.execute(exampleCar);
            await createCarUseCase.execute(exampleCar);
        }).rejects.toBeInstanceOf(AppError);
    })

    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute(exampleCar);
        expect(car.available).toBeTruthy();
    })

})