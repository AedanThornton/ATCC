import json
import csv

def csv_to_json(csv_file, json_file):
    """Converts CSV data to JSON."""
    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        output = {}
        for row in reader:
            keyword = []
            keyword.append({
                "text": row["Effects"],
                "formatting": ""
            })

            output[row["Name"]] = keyword
    
    with open(json_file, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=2)

csv_to_json("./src/data/CSV/titanAbilityData.csv", "./src/data/JSON/titanAbilityData.json")