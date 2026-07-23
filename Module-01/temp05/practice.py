#Vehicle Hierarchy
from abc import ABC, abstractmethod


class Vehicle(ABC):
    def __init__(self, make, model):
        
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")
    
    @abstractmethod
    def wheels(self):
        """Return the number of wheels."""
        pass

#Vehicle_1 = Vehicle("Toyota", "Corolla")
#print(Vehicle_1.describe())

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        print(f"{self.make} {self.model} - capacity: {self.capacity} tons")
    def wheels(self):
        return 6

class Car(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)

    def wheels(self):
        return 4    

def main():
    vehicles = [
       Car("Toyota", "Camry"),
       Truck("Volvo", "FH12", 20),
       Car("Honda", "Civic"),
       Truck("Mercedes", "Actros", 30)
    ]

    for vehicle in vehicles:
      vehicle.describe()
      print(f"Wheels: {vehicle.wheels()}")
      print("-" * 30)
if __name__ == "__main__":
    main()
