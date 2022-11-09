import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase"

let listCarUseCase: ListAvailableCarUseCase;
let carsRepository: CarsRepositoryInMemory;
let carPrototype = {
    name: "carr2o",
    brand: "marc2a",
    daily_rate: 303,
    description: "Te2st Description",
    fine_amount: 302,
    license_plate: "222813",
    category_id: "category_id"
}

describe('List Car', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        listCarUseCase = new ListAvailableCarUseCase(carsRepository)
    })


    it('should be able to list all available cars', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({});
        expect(cars).toEqual([car])
    })

    it('should be able to list all available car by name', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ brand: 'marc2a' });
        expect(cars).toEqual([car])
    })

    it('should not be able to list available car with wrong brand', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ brand: 'marca errada' });
        expect(cars).toHaveLength(0)
    })

    it('should be able to list available car with name', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ name: 'carr2o' });
        expect(cars).toEqual([car])
    })

    it('should not be able to list available car with wrong name', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ name: 'nome errado' });
        expect(cars).toHaveLength(0);
    })

    it('should be able to list available car with category_id', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ category_id: 'category_id' });
        expect(cars).toEqual([car])
    })

    it('should not be able to list available car with wrong category_id', async () => {
        const car = await carsRepository.create(carPrototype)
        const cars = await listCarUseCase.execute({ category_id: 'nome errado' });
        expect(cars).toHaveLength(0);
    })
})