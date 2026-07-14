#The Account Class
class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance   # Private attribute

    @property
    def balance(self):
        return self.__balance
    

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print("Deposit successful.")

        else:
            print("Deposit amount must be positive.")

    
    def withdraw(self, amount):
        if amount <= 0:
            print("withdrawal amount must be positive.")

        elif amount > self.__balance:
            print("Insufficient funds for withdrawal.")
        
        
        
        else:
            self.__balance -= amount
            print("Withdrawal successful.")




# Testing the Account class
Almaz = Account("Almaz", "123456789", 1000)
Samuel = Account("Samuel", "987654321", 500)


Almaz.deposit(200)
Samuel.withdraw(600)  # Should print "Insufficient funds for withdrawal."
Almaz.withdraw(300)


print(Almaz.balance)  # Should print 900
print(Samuel.balance)  # Should print 500