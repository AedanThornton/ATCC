import csv
import json
import re

KEYWORDS = {
    "Ambrosia Limit X/+X", "Armor-Piercing", "Armor Reroll X", "Assist X", "Attack Reroll X", "Auto-Black X", "Auto-Break X", "Auto-Inspire", 
    "Awakening Lock", "Black X", "Bleeding X", "Bleeding Limit X/+X", "Block X", "Break X", "Burden X", "Burn", "Bypass", "Carving X", 
    "Closing X", "Clutch", "Combo-Breaker: X spaces", "Self Combo-Breaker: X spaces", "Commit (X)", "Consume", "Crash", "Cryptex Loathing", 
    "Cumbersome", "Cursed", "Daze", "Deadly", "Death X", "Defy X", "Displace", "Diversion", "Dodge", "Doomed", "Double Commit", "Elation X", 
    "Escalate X", "Evolving", "Fate Armor", "Fire X", "Float", "Frontlines", "Glaciate", "Giant Glaciate", "Greater Pass X", "Hardened", 
    "Heal", "Heartseeker", "Hermes Move X", "Hermes Reflex", "Advanced Hermes Reflex", "Hermes Resposition X", "Hide", "Hope X", 
    "Incinerated", "Inspire X", "Jump", "Advanced Jump", "Knockback X", "Knockdown", "Laser Resistance X", "Lifeline", "Light X", 
    "Lumbering", "Masterwork", "Midas X", "Midas Immune", "Motivate X", "Opening X", "Overbreak X", "Pass X", "Perishable", "Precise", 
    "Provoke", "Pole Position", "Power Reroll X", "Pull X", "Pursuit X", "Pushback X", "Quantum", "Ranged Y-X", "Reach X", "Reduction X", 
    "Wish Away Reduction X", "Pushback Reduction X", "Knockback Reduction X", "Kickback Reduction X", "Pull Reduction X", "Reflex", 
    "Advanced Reflex", "Superior Reflex", "Reinforce X", "Advanced Reinforce X", "Superior Reinforce X", "Reposition X", "Restricted (Trait)", 
    "Rewind", "Rocksteady", "Rollout", "Rouse X", "Rush", "Improved Rush", "Sacrifice", "Scale", "Scale X", "Second Chance", "Shaded", 
    "Solace", "Spiral X", "Spotlight", "Stalwart", "Startup X", "Strikeback X", "Succor", "Super Smart Delivery", "Superior Chance", 
    "BP Suppress", "AI Suppress", "Temporal Reflex", "Time-Clocked", "Tireless", "Titan Possession", "Argonaut Possession", "Transform", 
    "Trauma Trick", "Wound Trick", "Fail Trick", "Tumble", "Unburden X", "Unholy Alchemy", "Reverse Unholy Alchemy", "Vault", "Forced Vault", 
    "Voluntary Knockdown", "Wish Armor", "Wish Away X", "Wishcursed", "Wish Dodge", "Advanced Wish Dodge", "Wishrod"
}

COSTS = {
    "Fate", "Danger", "Exhaust", "Discard", "Midas", "Energy", "Ambrosia", "Combat Action", "Movement Action"
}

TIMINGS = {
    "Reaction", "Wound:", "Crit Fail:", "Crit Evade Fail:", "Crit Chance:", "Crit Evade:", "Full Hit:", "Full Miss:", "Each Hit:"
}

def parse_power(power_str):
    """Parses the power string into a structured list."""
    powers = []
    for part in power_str.split(". "):
        match = re.match(r"(\w+ \d+\+)\s*\+?(\d+)\s*(\w+)", part)
        if match:
            gate_type, amount, power_type = match.groups()
            powers.append({
                "amount": int(amount),
                "type": power_type,
                "gate": {
                    "type": gate_type.split()[0],
                    "value": gate_type.split()[1]
                }
            })
        else:
            match = re.match(r"(\d+)\s*(\w+)", part)
            if match:
                amount, power_type = match.groups()
                powers.append({"amount": int(amount), "type": power_type})
    return powers

def parse_armor(armor_str):
    armor = []
    for part in armor_str.split(". "):
        match = re.match(r"(\d+)\s*(\w+)", part)
        if match:
            amount, die_type = match.groups()
            armor.append({
                "amount": int(amount),
                "type": die_type
            })
    return armor

def parse_abilities(ability_box):
    """Parses the ability box into keywords and unique abilities."""
    keywords, unique_abilities = [], []
    ability_list = re.split(r"\.\s?", ability_box)[:-1]
    gate_pattern = re.compile(r"(\w+) (\d\+)")
    x_pattern = re.compile(r"^([\w\s:\+,\-']+?)(?:\s+([\dX\-]+))?$")
    
    for ability in ability_list:
        if ability == "Unique" or ability == "Ascended": continue
        gate_match = gate_pattern.match(ability)
            
        ability_name = ability.split("+ ")[-1]
        keyword_match = x_pattern.match(ability_name)

        effect, x_value = keyword_match.groups() if keyword_match else (ability_name, None)

        costs = []
        timing = ""
        words = effect.split()
        if words[0] in TIMINGS:
            timing = words[0]
            words.remove(words[0])
        for word in words[:]:
            if word in COSTS:
                costs.append(word)
                words.remove(word)
            else: break
        if costs != []:
            if words[0] in TIMINGS:
                timing = words[0]
                words.remove(words[0])

        name = " ".join(words)
                

        ability_json = {}
        ability_json["name"] = name
        if x_value:
            y_pattern = re.compile(r"(\d)\-(\d)")
            y_match = y_pattern.match(x_value)
            y, x = y_match.groups() if y_match else (None, x_value)
            if y_match:
                ability_json["y_value"] = int(y)
                ability_json["x_value"] = int(x)
            else:
                ability_json["x_value"] = int(x)
        if gate_match:
            gate_type, gate_value = gate_match.groups()
            ability_json["gate"] = {"type": gate_type.lower(), "value": gate_value}
        if costs != []:
            ability_json["costs"] = costs
        if timing != "":
            ability_json["timing"] = timing

        if name in KEYWORDS:
            keywords.append(ability_json)
        else:
            unique_abilities.append(ability_json)
    
    return {"keywords": keywords, "unique-abilities": unique_abilities}

def csv_to_json(csv_file, json_file):
    """Converts CSV data to JSON."""
    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        output = []
        for row in reader:
            card_ids = row["Card Number"].split(", ")
            offensive_statistics = {
                "attack-dice": row["Attack Dice"],
                "precision": row["Precision"],
                "power": parse_power(row["Power"])
            }
            defensive_statistics = {}
            if row["Evasion Rerolls"]: defensive_statistics["evasion-rerolls"] = row["Evasion Rerolls"]
            if row["Evasion Bonus"]: defensive_statistics["evasion-bonus"] = row["Evasion Bonus"]
            if row["Armor Dice"]: defensive_statistics["armor-dice"] = parse_armor(row["Armor Dice"])
            if row["Resistances"]: defensive_statistics["resistances"] = map(parse_armor, row["Resistances"].split(". "))

            abilities = parse_abilities(row["Ability Box"])
            
            card_json = {
                "card-ids": card_ids,
                "name": row["Name"].replace(" (Wished)", ""),
                "card-type": row["Card Type"],
                "card-size": row["Card Size"],
                "cycle": row["Cycle"],
                "used-for": row["Used For"],
                "acquisition": row["Acquisition"],
                "flavor": row["Flavor"],
                "slot": row["Slot"],
                "transforms-into": row["Transforms Into"] or None,
                "traits": row["Traits"].split(", ") if row["Traits"] else [],
                "offensive-statistics": offensive_statistics,
                "defensive-statistics": defensive_statistics,
                "asterisk-effect": row["Asterisk Effect"] or None,
                "wished": "(Wished)" in row["Name"],
                "unique": "Unique" in row["Ability Box"],
                "ascended": "Ascended" in row["Ability Box"],
                "abilities": abilities
            }
            output.append(card_json)
    
    with open(json_file, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=2)

csv_to_json("./src/data/CSV/gearData.csv", "./src/data/JSON/gearData.json")