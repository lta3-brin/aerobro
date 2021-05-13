import sys
from dotenv import load_dotenv
from proc.handler import calc_data

if __name__ == "__main__":
    load_dotenv()

    args = sys.argv
    if "daily" in args:
        calc_data("daily")
    elif "weekly" in args:
        calc_data("weekly")
    elif "monthly" in args:
        calc_data("monthly")
    elif "yearly" in args:
        calc_data("yearly")
    else:
        print("Argumen tidak valid. Opsi: daily, weekly, monthly dan yearly.")
