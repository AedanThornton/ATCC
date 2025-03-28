import csv
import json
import re

def parse_consequences(consequences):
    """Parses the Attack Consequences."""
    consequences_list = re.split(r"\.\s?", consequences)
    if len(consequences_list) > 1:
        consequences_list = consequences_list[:-1]
    new_json = []
    gate_pattern = re.compile(r"(\w+) (\d\+) (.*)")

    for consequence in consequences_list:
        if consequence == "": continue
        consequence_json = {}
        if consequence[:3] == "WoO":
            consequence_json["WoO"] = True
            consequence = consequence[3:]

        gate_match = gate_pattern.match(consequence)
        if gate_match:
            gate_type, gate_value, effect = gate_match.groups()
            if not gate_type == "If":
                consequence_json["gate"] = {"gateType": gate_type, "gateValue": gate_value}
            else:
                effect = consequence
        else:
            effect = consequence
        consequence_json["effect"] = effect
        new_json.append(consequence_json)

    return new_json

def parse_targeting(targeting):
    """Parses the Attack Consequences."""
    targeting_lines = re.split(r"\.\s?", targeting)[:-1]
    new_json = []
    
    for line in targeting_lines:
        line_json = {}
        line_type = line.split(": ")
        if len(line_type) > 1:
            line_json["type"] = line_type[0] + ":"
            line_json["target"] = line_type[1]
        else:
            line_json["type"] = "Target:"
            line_json["target"] = line
        new_json.append(line_json)

    return new_json

def csv_to_json(csv_file, json_file):
    """Converts CSV data to JSON."""
    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        output = []
        for row in reader:
            card_ids = row["Card ID"].split(", ")

            targeting = parse_targeting(row["Targeting"])
            banners = parse_consequences(row["Attack Banners"])
            consequences = parse_consequences(row["Attack Consequences"])
            after_attack_effects = parse_consequences(row["After Attack Effects"])
            
            card_json = {
                "cardIDs": card_ids,
                "name": row["Name"].replace(" (Wished)", ""),
                "cardType": row["Card Type"],
                "subtype": row["Subtype"],
                "cardSize": row["Card Size"],
                "cycle": row["Cycle"],
                "usedFor": row["Used For"],
                "flavor": row["Flavor"],
                "level": row["Level"],
                "uber": "TRUE" in row["Uber?"],
                "targeting": targeting,
                "preAction": row["Pre-Action Effects"],
                "preActionWoO": "TRUE" in row["Pre-Action WoO?"],
                "moveType": row["Move Type"],
                "preAttack": row["Pre-Attack Effect"],
                "attackType": row["Attack Type"],
                "attackBanners": banners,
                "dice": row["Dice"],
                "difficulty": row["Difficulty"],
                "consequences": consequences,
            }

            if after_attack_effects:
                card_json["preAfterAttackWoO"] = "TRUE" in row["Pre-After Attack WoO?"]
                card_json["afterFinal"] = "TRUE" in row["After Final?"]
                card_json["afterAttackEffects"] = after_attack_effects

            if not card_json["preAction"]:
                card_json.pop("preAction")
            if not card_json["preAttack"]:
                card_json.pop("preAttack")
            if not card_json["uber"]:
                card_json.pop("uber")

            output.append(card_json)
    
    with open(json_file, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=2)

csv_to_json("./src/data/CSV/primordialAttackData.csv", "./src/data/JSON/primordialAttackData.json")