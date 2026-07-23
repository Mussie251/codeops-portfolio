#The Account Registry

from abc import ABC

class Account(ABC):

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self.history = []

        #Observe list
        self._observers = []
        
    @property
    def balance(self):
        return self._balance
        
        #observer pattern
    def subscribe(self, observer):
        self._observers.append(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

       #Banking method
    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance += amount
        self.notify(f"{self.owner}: Deposited {amount} ETB. Balance is {self.balance} ETB")
        self.history.append(("deposit", amount))
    
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive")
            return
        if amount >= self.balance:
            print("Insufficient balance")
            return
        self._balance -= amount
        self.notify(f"{self.owner}: withdrew {amount} ETB. Balance is {self.balance} ETB.")
        self.history.append(("withdraw", amount))
    def undo_last(self):
        if not self.history:
            print("Nothing to undo")
            return
        action, amount = self.history.pop()
        if action == "deposit":
            self._balance -= amount
        elif action == "withdraw":
            self._balance += amount
    def __str__(self):
        return (
            f"{self.owner} | "
            f"Account: {self.account_number} | "
            f"Balance: {self.balance:.2f} ETB"
        )
    def statement(self):
        print("/" * 40)
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")
        print(f"History: {self.history}")
        print("\ " * 40)

    def total_transactions(self):

        def recursive(history):

            if len(history) == 0:
                return 0
            return 1 + recursive(history[1:])
        return recursive(self.history)

class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_number] = account

    def find(self, account_number):
        return self.accounts.get(account_number)
    
    def list_all(self):
        return sorted(self.accounts.values(),key=lambda account: account.account_number)

    def top_by_balance(self, n):
        return sorted(self.accounts.values(),
                      key=lambda account: account.balance,
                      reverse=True)[:n]

    def binary_search(self, sorted_accounts, account_number):
        left = 0
        right = len(sorted_accounts) - 1

        while left <= right:
            mid = (left + right) // 2
            current = sorted_accounts[mid]

            if current.account_number == account_number:
                return current
            elif account_number < current.account_number:
                right = mid - 1

            else:
                left = mid + 1

        return None

    def find_by_number(self, account_number):

        sorted_accounts = sorted(self.accounts.values(),
                                 key=lambda account: account.account_number)

        return self.binary_search(sorted_accounts, account_number)        



    
class SavingsAccount(Account):
    def __init__(self, owner, account_number, rate, balance=0):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate

        #Reusing deposit
        self.deposit(interest)

class CurrentAccount(Account):
    def __init__(self, owner, account_number, overdraft, balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft        
    
    def withdraw(self, amount):
        if amount <= 0:
            print("withdrawal amount must be positive.")
            return
        if amount > self.balance + self.overdraft:
            print("Over limit exceeded.")
            return
        self._balance -= amount
        self.notify(
            f"{self.owner}: withdrew {amount} ETB."
            f"Balance = {self.balance} ETB."
        )

#Observer interface
class AlertService:
    
    def update(self, message):
        raise NotImplementedError
    
#Concerete Observer
class SMSAlert(AlertService):
    def update(self, message):
        print(f"[SMS ALERT] {message}")

class AccountFactory:

    @staticmethod
    def create(kind, owner, account_number, **kwargs):

        if kind.lower() == "savings":
            return SavingsAccount(owner, account_number, 
                                  kwargs.get("rate", 0.05),
                                  kwargs.get("balance", 0))

        elif kind.lower() == "current":
            return CurrentAccount(owner,account_number, 
                                  kwargs.get("overdraft", 0),
                                  kwargs.get("balance", 0))

        else:
            raise ValueError("Unkown account type.") 
        
def main():

    sms = SMSAlert()

    #Factory pattern
    savings = AccountFactory.create(
        "savings",
        "Abel",
        "S-1001",
        balance=5000,
        rate=0.10
    )

    current = AccountFactory.create(
        "current",
        "Sara",
        "C-1001",
        balance=2000,
        overdraft=1000
    )
    #Observer pattern
    savings.subscribe(sms)
    current.subscribe(sms)

    print("--------- Savings Account ----------")
    print(savings)

    savings.deposit(500)
    savings.withdraw(1000)
    savings.add_interest()

    print()

    print("---------- Current Account ----------")
    print(current)

    current.deposit(500)
    current.withdraw(2800)
    current.withdraw(1000)
    
    print()

    print("---------- Final Balances -----------")
    print(savings)
    print(current)


if __name__ == "__main__":
    main() 
    

registry = AccountRegistry()

Elias = AccountFactory.create("savings", "Elias", "E-1100", balance=2000, rate=0.05)
Daniel = AccountFactory.create("savings", "Daniel", "D-1101", balance=500, rate=0.05)

registry.add(Elias)
registry.add(Daniel)

Elias.deposit(500)
Elias.deposit(600)
Elias.withdraw(1000)


Daniel.withdraw(800)
Daniel.withdraw(300)
Daniel.deposit(1000)

print("Finding account E-1100")
account = registry.find("E-1100")
account.statement()

print("undoing the last transaction of Elias")
Elias.undo_last()
Elias.statement()
#All accounts


for account in registry.list_all():
    account.statement()


print("\nTop 2 Accounts by Balance")

leaders = registry.top_by_balance(2)

for account in leaders:
    print(account)

print("\nSearching using Binary Search")
found = registry.find_by_number("D-1101")

if found:
    print(found)

else:
    print("Account not Found")

print("\nTransactions total")

print(Elias.total_transactions())
print(Daniel.total_transactions())