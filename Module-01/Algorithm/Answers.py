

def getOnlyEvens(numbers):
    evens = []
    

    for i in range(len(numbers)):

        if i % 2 == 0 and numbers[i] % 2 == 0:
            evens.append(numbers[i])

    print(evens)        

#Test
getOnlyEvens([1, 2, 3, 6, 4, 8])
getOnlyEvens([0, 1, 2, 3, 4])




#Question 2

def reverseCompare(number):
    tens = number // 10
    ones = number % 10

    reversed_num = ones * 10 + tens

    if number > reversed_num:
        print("Ok")
    else:
        print("Not ok")


# Tests
reverseCompare(72)
reverseCompare(23)

#Question 3

def returnFactorial(number):
    result = 1

    for i in range(1, number + 1):
        result *= i

    return result
print(returnFactorial(5))
print(returnFactorial(6))
print(returnFactorial(0))


#Question 4

def checkMeera(numbers):

    for number in numbers:

        if number * 2 in numbers:
            print("I am not a Merra array!")
            return
    print("I am a Merra array!")
checkMeera([10, 4, 0, 5])

#Question 5

def isDual(array):
    count = {}

    for number in array:
        if number in count:
            count[number] += 1

        else:
            count[number] = 1

    for value in count.values():
        if value != 2:
            return 0

    return 1

#Test
print(isDual([1, 2, 1, 3, 3, 2]))
print(isDual([2, 5, 2, 5, 5]))
print(isDual([3, 1, 1, 2, 2]))  

#Question 6
def digitalClock(seconds):
    seconds = seconds % 86400
    hours = seconds // 3600
    seconds = seconds % 3600
    minutes = seconds // 60
    seconds = seconds % 60

    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

print(digitalClock(5025))
print(digitalClock(61201))
print(digitalClock(87000))
