import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

const exampleCar = {
    name: 'Test Car',
    brand: 'Test Brand',
    daily_rate: 30,
    description: 'Test Description',
    fine_amount: 30,
    license_plate: '222033',
    category_id: 'f009e970-f1fc-4c89-8576-e642f83b51c4'
}

describe("Create car specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })


    it('should be able to add a new specification to a non existent car', async () => {
        expect(async () => {
            const car_id = '1233123214';
            const specifications_id = ['4321']
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create(exampleCar);
        const specifications_id = ['4321']
        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    })
})