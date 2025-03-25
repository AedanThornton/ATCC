import csv
import json
import re

KEYWORDS = {
    "Ambrosia Limit", "Armor-Piercing", "Armor Re-roll", "Assist", "Attack Reroll", "Auto-black", "Auto-break", "Auto-inspire", 
    "Awakening Lock", "Black", "Bleeding", "Bleeding Limit", "Block", "Break", "Burden", "Burn", "Bypass", "Carving", 
    "Closing", "Clutch", "Combo-Breaker: X spaces", "Self Combo-Breaker: X spaces", "Commit (X)", "Commit", "Consume", "Crash", "Cryptex Loathing", 
    "Cumbersome", "Cursed", "Daze", "Deadly", "Death", "Defy", "Displace", "Diversion", "Dodge", "Doomed", "Double Commit", "Elation", 
    "Escalate", "Evolving", "Fire", "Float", "Frontlines", "Glaciate", "Giant Glaciate", "Greater Pass", "Hardened", 
    "Heal", "Heartseeker", "Hermes Move", "Hermes Reflex", "Advanced Hermes Reflex", "Hermes Resposition", "Hide", "Hope", 
    "Incinerated", "Inspire", "Jump", "Advanced Jump", "Knockback", "Knockdown", "Laser Resistance", "Lifeline", "Light", 
    "Lumbering", "Masterwork", "Midas", "Midas Immune", "Motivate", "Opening", "Overbreak", "Pass", "Perishable", "Precise", 
    "Provoke", "Pole Position", "Power Re-roll", "Pull", "Pursuit", "Pushback", "Quantum", "Ranged", "Reach", "Reduction", 
    "Wish Away Reduction", "Pushback Reduction", "Knockback Reduction", "Kickback Reduction", "Pull Reduction", "Reflex", 
    "Advanced Reflex", "Superior Reflex", "Reinforce", "Advanced Reinforce", "Superior Reinforce", "Reposition", "Restricted (Trait)", 
    "Rewind", "Rocksteady", "Rollout", "Rouse", "Rush", "Improved Rush", "Sacrifice", "Scale", "Second Chance", "Shaded", 
    "Solace", "Spiral", "Spotlight", "Stalwart", "Startup", "Strikeback", "Succor", "Super Smart Delivery", "Superior Chance", 
    "BP Suppress", "AI Suppress", "Temporal Reflex", "Time-Clocked", "Tireless", "Titan Possession", "Argonaut Possession", "Transform", 
    "Trauma Trick", "Wound Trick", "Fail Trick", "Tumble", "Unburden", "Unholy Alchemy", "Reverse Unholy Alchemy", "Vault", "Forced Vault", 
    "Voluntary Knockdown", "Wish Armor", "Wish Away", "Wishcursed", "Wish Dodge", "Advanced Wish Dodge", "Wishrod"
}

KEYWORDS_WITH_COST_NAME = {
    "Fate Armor"
}

COSTS = {
    "Fate", "Danger", "Exhaust", "Discard", "MidasToken", "Energy", "AmbrosiaToken", "CombatAction", "MovementAction", "FireToken"
}

TIMINGS = {
    "Reaction", "Wound", "Crit Miss", "Crit Evade Fail", "Crit Chance", "Crit Evade", "Full Evade", "Full Hit", "Full Miss", "Each Hit", "Sunstarved", "Start of Battle"
}

def parse_power(power_str):
    """Parses the power."""
    powers = []
    for part in power_str.split(". "):
        gate_match = re.match(r"(\w+ \d+\+)\s*(\+?)(\d+)\s*(\w+)", part)
        hits_match = re.match(r"(\d+\+) Hits\s*(\d+)\s*(\w+)", part)
        if gate_match:
            gate_type, plus, amount, power_type = gate_match.groups()
            power = {
                "amount": int(amount),
                "type": power_type,
                "gate": {
                    "type": gate_type.split()[0],
                    "value": gate_type.split()[1]
                }
            }
            if plus:
                power["plus"] = True

            powers.append(power)
        elif hits_match:
            hits, amount, power_type = hits_match.groups()
            power = {
                "amount": int(amount),
                "type": power_type,
                "gate": {
                    "type": "Hits",
                    "value": hits
                }
            }

            powers.append(power)
        else:
            match = re.match(r"(\+?)(\d+)\s*(\w+)", part)
            if match:
                plus, amount, power_type = match.groups()
                power = {"amount": int(amount), "type": power_type}
                if plus:
                    power["plus"] = True
                powers.append(power)
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
    """Parses the ability box."""
    new_ability_list = []
    gate_ability_list = []
    ability_list = re.split(r"\.\s?", ability_box)[:-1]
    gate_pattern = re.compile(r"(\w+) (\d\+) (.*)")
    x_pattern = re.compile(r"^([\w\s:\+,\-']+?)(?:\s+([\dX\-]+))?$")

    parsing_gate_abilities = False
    gated_ability = []
    last_gate_json = {}
    
    for ability in ability_list:
        if ability == "Unique" or ability == "Ascended": continue
        gate_match = gate_pattern.match(ability)
        if gate_match:
            gate_type, gate_value, ability_name = gate_match.groups()
            parsing_gate_abilities = True
        else: ability_name = ability
            
        keyword_match = x_pattern.match(ability_name)

        effect, x_value = keyword_match.groups() if keyword_match else (ability_name, None)

        costs = []
        timing = ""
        timingAfter = False
        flavorName = ""
        words = effect.split()
        colon_timings = effect.split(":")
        if words[0] in TIMINGS:
            timing = words[0]
            words.remove(words[0])
        for word in words[:]:
            if word in COSTS:
                costs.append(word)
                words.remove(word)
            else: break
        colon_timings = " ".join(words).split(":")
        if words[0] in TIMINGS:
            timing = words[0]
            timingAfter = True
            words.remove(words[0])
        if len(colon_timings) > 1:
            if colon_timings[0] in TIMINGS:
                timing = colon_timings[0]
                words = ":".join(colon_timings).replace(colon_timings[0] + ": ", "").split()
            elif len(colon_timings[0]) < 20:
                flavorName = colon_timings[0]
                words = ":".join(colon_timings).replace(colon_timings[0] + ": ", "").split()

        name = " ".join(words)
                

        ability_json = {}
        ability_json["name"] = name
        if flavorName:
            ability_json["flavorName"] = flavorName
        if x_value:
            y_pattern = re.compile(r"(\d)\-(\d)")
            y_match = y_pattern.match(x_value)
            y, x = y_match.groups() if y_match else (None, x_value)
            if y_match:
                ability_json["y_value"] = int(y)
                ability_json["x_value"] = int(x)
            else:
                ability_json["x_value"] = int(x)
        if costs != []:
            ability_json["costs"] = costs
        if timing != "":
            ability_json["timing"] = timing
        if timingAfter:
            ability_json["timingAfter"] = True

        if name in KEYWORDS:
            ability_json["type"] = "keyword"
        else:
            ability_json["type"] = "unique"

        gate_json = {}
        if gate_match:
            gate_json["gate"] = gate_type
            gate_json["value"] = gate_value
        
        if parsing_gate_abilities:
            if gate_match:
                if last_gate_json:
                    last_gate_json["abilities"] = gated_ability
                    gate_ability_list.append(last_gate_json)
                    last_gate_json = {}
                    gated_ability = []  
                last_gate_json = gate_json
            gated_ability.append(ability_json)
        else: 
            new_ability_list.append(ability_json)

    if last_gate_json: 
        last_gate_json["abilities"] = gated_ability
        gate_ability_list.append(last_gate_json)
    return new_ability_list, gate_ability_list

def csv_to_json(csv_file, json_file):
    """Converts CSV data to JSON."""
    with open(csv_file, newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=',', quotechar='"')
        output = []
        for row in reader:
            card_ids = row["Card ID"].split(", ")
            offensive_statistics = {
                "attackDice": row["Attack Dice"],
                "precision": row["Precision"],
                "power": parse_power(row["Power"])
            }
            defensive_statistics = {}
            if row["Evasion Rerolls"]: defensive_statistics["evasionRerolls"] = row["Evasion Rerolls"]
            if row["Evasion Bonus"]: defensive_statistics["evasionBonus"] = row["Evasion Bonus"]
            if row["Armor Dice"]: defensive_statistics["armorDice"] = parse_armor(row["Armor Dice"])
            if row["Resistances"]: defensive_statistics["resistances"] = map(parse_armor, row["Resistances"].split(". "))

            abilities, gated_abilities = parse_abilities(row["Ability Box"])
            
            card_json = {
                "cardIDs": card_ids,
                "name": row["Name"].replace(" (Wished)", ""),
                "cardType": row["Card Type"],
                "cardSize": row["Card Size"],
                "cycle": row["Cycle"],
                "usedFor": row["Found In"],
                "acquisition": row["Acquisition"],
                "flavor": row["Flavor"],
                "slot": row["Slot"],
                "transformsInto": row["Transforms Into"] or None,
                "traits": row["Traits"].split(", ") if row["Traits"] else [],
                "offensiveStatistics": offensive_statistics,
                "defensiveStatistics": defensive_statistics,
                "asteriskEffect": row["Asterisk Effect"] or None,
                "wished": "(Wished)" in row["Name"],
                "unique": "Unique" in row["Ability Box"],
                "ascended": "Ascended" in row["Ability Box"],
                "abilities": abilities,
                "gatedAbilities": gated_abilities
            }

            if not card_json["usedFor"]:
                card_json.pop("usedFor")

            output.append(card_json)
    
    with open(json_file, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=2)

csv_to_json("./src/data/CSV/gearData.csv", "./src/data/JSON/gearData.json")