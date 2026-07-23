# The Account Management System
class Account:

    def __init__(self, owner, number, balance=0):
        
        self.owner = owner
        self.account_number = number
        self.__balance = balance  # Private attribute

    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount < 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount

    def withdraw(self, amount):
        if amount < 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds for withdrawal.")
        self.__balance -= amount


    def statement(self):
            print("owner:", self.owner)
            print("Account Number:", self.account_number)
            print("Balance:", self.balance, "ETB")




# Testing the Account Management System
Almaz = Account("Almaz", "123456789")     
Samuel = Account("Samuel", "987654321")

Almaz.deposit(1000)
Samuel.deposit(500)


Almaz.statement()
Samuel.statement()
