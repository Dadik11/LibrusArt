from colorama import init, Fore

def initialize():
    init(convert=True)

def info(msg):
    print(Fore.LIGHTBLACK_EX + '[*] ' + Fore.RESET + str(msg))

def error(msg):
    print(Fore.LIGHTRED_EX + '[-] ' + Fore.RESET + str(msg))

def okay(msg):
    print(Fore.LIGHTGREEN_EX + '[+] ' + Fore.RESET + str(msg))