class SavingsAccount: 
    def __init__(self, owner, number):
        self._observers = []
        self.balance = 1000
        
    def subscribe(self, obs):
        self._observers.append(obs)

    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)
            # print(self._observers)

    def withdraw(self, amount):
        self.balance -= amount
        self._notify(f"-{amount} ETB")
    def interest(self):
        return 0.07


class AccountFactory:
    def __init__(self):
        self._observers = []
        self.balance = 1000

    @staticmethod
    def create(kind, owner, number):
        if kind == "savings":
            # return (owner, number)
            return SavingsAccount(owner, number)
        # if kind == "current":
        #     # return (owner, number)
        #     return CurrentAccount(owner, number)
        raise ValueError(f"Unknown: {kind}")
        
        
        
class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")

class AuditLog:
        def update(self, event):
            print(f"[Log] {event}")
acc = AccountFactory.create("savings", "Dawit", "CBE-2")
acc.subscribe(SMSAlert())
acc.subscribe(AuditLog())
acc.withdraw(5000) # both observers fire
acc.withdraw(1000) # both observers fire