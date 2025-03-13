import csv
import json

def csv_to_json(csv_file, json_file):
    """Converts CSV data to JSON."""
    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        output = []
        for row in reader:
            card_json = {
                "cardIDs": row["Card ID"].split(", "),
                "name": row["Name"],
                "cardType": row["Card Type"],
                "cardSize": row["Card Size"],
                "cycle": row["Cycle"],
                "flavor": row["Flavor"],
                "stat": row["Stat"]
            }
            output.append(card_json)
    
    with open(json_file, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=2)

csv_to_json("./src/data/CSV/argonautData.csv", "./src/data/JSON/argonautData.json")