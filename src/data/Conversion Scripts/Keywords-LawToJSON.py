import json
import re

# Input abilities as a string
abilities_text = """
Airburst X. Titans in Zone X suffer Knockdown and Knockback 1.

Ambrosia Limit X/+X. Your Ambrosia Limit becomes X or is increased by X, respectively. If you have more than one instance of the former, then the one with the greatest X is used (before applying modifiers). Ambrosia Limit X does not stack, Ambrosia Limit +X does.

Armor-piercing. During the Power Roll, ignore Hardened.

Armor Re-roll X. During the Armor Roll step of a Primordial Attack Sequence, you may reroll up to X Armor dice.

Ascended. This Gear ignores Power Level penalties.

Assist X. During another Titan’s Power Roll, if, after applying all bonuses, their total Power is less than the AT value and you are within your weapon’s range, you may gain 1 Rage and a Combat Fatigue to immediately add X Break tokens to the Kratos Pool. This ability can only be used if it allows the Attacker to Wound.

Attack Re-roll X. During an Attack Roll, you may re-roll up to X Attack dice with no cost.

Auto-black X. During the first ability window, place X Black tokens (X.1.9.6) in the Kratos Pool.

Auto-break X. During the first ability window, place X Break tokens (X.1.9.1) in the Kratos Pool.

Auto-hope X. During the first ability window, place X Hope tokens (X.1.9.7) in the Kratos Pool.

Auto-inspire. You may stand up as a free action. You may use this ability while Knocked Down.

Auto-rouse X. During the first ability window, place X Rouse tokens (X.1.9.6) in the Kratos Pool.

Awakening Lock. You cannot Awaken.

Black X. During the second ability window, place X Black tokens (X.1.9.6) in the Kratos Pool.

Bleeding X. Gain the Bleeding Condition card (unless you already have it) and place X Bleeding tokens on it.

Bleeding Limit X/+X. Your Bleeding Limit becomes X or is increased by X, respectively. If you have more than one instance of the former, then the one with the greatest X is used (before applying modifiers). Bleeding Limit X does not stack, Bleeding Limit +X does.

Block X. After counting hits from an Evasion Roll, subtract X hits.

Break X. During the second ability window, place X Break tokens (X.1.9.1) in the Kratos Pool.

Burden X. During the First or second ability window, take X Condition, Despair, or Ambrosia tokens from the nearest Titan. (This does not count as gaining those tokens.)

Burn. Gain 1 Danger for each Metal Gear card you have equipped and discard all Flammable Gear cards. If this is part of a Primordial Attack Sequence, add the Danger gained to the Danger gained from hits.

Bypass. You may move through other Titans. You cannot end your voluntary movement on a space occupied by another Titan.

Carving X. When you wound the Primordial, test Wisdom (8+). On a success, you immediately gain X additional non-Core Primordial resources from that BP card. These resources are not multiplied by the Primordial level.

Closing X. During the second ability window, place X Closing tokens (X.1.9.8) in the Kratos Pool.

Clutch. During the Power Roll step, if, after applying bonuses, you have less total Power than the AT value by exactly 1, you may gain 1 Power. After you finish resolving this Attack Sequence, discard your active weapon.

Combo-breaker: X spaces. When you would break a Combo, you may move X spaces before checking range. You may only use this ability if it would allow you to break a Combo. This ability is not stackable.
Self Combo-breaker: X spaces. Identical to Combo-breaker, but you can only use the Gear card which this ability is on to break the Combo (you do not have to exhaust an additional card). This Gear must still possess a matching Weapon Trait.

Commit (X). This Keyword forces a cost to pay in order to declare this Weapon as an Active Weapon (X.5.1). If…
…no parentheses, you must gain 1 Fate to declare this weapon as your active weapon.
…X is a Midas token, you must gain 1 Midas token to declare this weapon as your active weapon.
…X is a Charge token, you must discard 1 Charge token to declare this weapon as your active weapon.
…X is a Fire token, you must discard 1 Fire token from the Kratos Pool to declare this weapon as your active weapon.

Consume. Treat “consume” as an Instant Death effect.

Crash. Gain 1 Danger and Knockdown.

Cryptex Loathing. Treat your Cryptex gear card as blank.

Cumbersome. During the second ability window, if you successfully wounded with this weapon, exhaust it. This is treated as a voluntary exhaust.

Cursed. During your Titan Attack, you cannot re-roll d10s.

Daze. During the first ability window, if you are adjacent to the Primordial, you may turn the Primordial so that you are in a Rear space.

Deadly. During an Attack Roll, replace one of your regular Attack dice with an additional Crit die. If you roll only one Attack die, you gain a Crit Chance on a natural 9–10 result instead.

Death X. Gain the Death Condition card (unless you already have it) and place X Condition tokens on it. If you already have the Death Condition card and X is lower than the number of Condition tokens you have, discard Condition tokens until you X matches.

Defy X. While performing a Skill test caused by a Judgement, treat X successful hits as evaded.

Displace. Move to an empty space adjacent to its current position. If a Titan is displaced and there is no space it can be legally displaced to, it dies instead.

Diversion. During the second ability window, place a Diversion token (X.1.9.3) in the Kratos Pool. 

Dodge. When you are about to resolve an Evasion Roll, gain +1 Evasion for this roll.

Doomed. During this effect, dice cannot be re-rolled using Fate.

Double Commit. You must gain 2 Fate to declare this weapon as your active weapon.

Elation X. During the second ability window, you may discard X Despair tokens or Ambrosia tokens to place X Opening tokens in the Kratos Pool (X.1.9.2).

Escalate X. Escalate X times (X.5.10.6). Do not look at the removed cards.

Evolving. When you equip a Gear card with this keyword, write the Gear’s name on your Argonaut sheet in the Mnemos section. The Gear instructs you on what you need to do to evolve it. Track your progress on doing so by marking nodes on the Mnemos track. If this Gear card is equipped by another Argonaut, continue keeping track on the original sheet. If the Argonaut the original sheet belongs to dies, transfer the progress to another living Argonaut’s sheet. If you permanently lose the Gear card, erase it from the sheet; you lose all evolution progress on it.

Fate Armor. This card’s Armor Dice may also be used to mitigate Fate dealt by Primordial Attacks. If you are dealt Fate and Danger, you may distribute the mitigation between the two.

Fire X. During the second ability window, place X Fire tokens (X.1.9.4) in the Kratos Pool.

Float. Gain the Float Condition card, Float (up) side up, and place your miniature on its side.

Frontlines. If your Titan is dead, at the End of Battle roll a d10. On a ‘1’, your Argonaut dies as well.

Glaciate. To Glaciate a space, place a Black Iceberg Terrain tile there.
Giant Glaciate. To Giant Glaciate a space, place a Giant Black Iceberg Terrain tile there.

Greater Pass X. During the Clear the Kratos Pool step, choose up to X Kratos tokens to remain in the pool.

Hardened. A BP card with this keyword has +2 AT. Ignore this ability if you have a Crit Chance.

Heal. Take the top card from the Wound Stack and remove it from the Battle. It does not provide resources at the end of the Battle.

Heartseeker. During the Draw BP card step of a Titan Attack Sequence (X.5.6), you may look at the top two BP cards and choose which one to attack. Shuffle the other card back into the deck.

Hermes Move X. Perform up to X Hermes Moves. 
Hermes Move. To perform a Hermes Move, draw a straight line in any cardinal direction from the Titan performing the action, stopping when you hit a Terrain tile. Then, choose an Elevated Terrain tile space, either the one the line ended on or one on a space adjacent to the spaces the drawn line went through, and place the Titan on that Terrain tile.
Must Be Empty. The chosen Terrain tile space must be empty. When performing more than one Hermes Move from a single action, only the final Hermes Move needs to follow this rule.

Hermes Reflex. Perform one Hermes Move.
Advanced Hermes Reflex. Perform up to two Hermes Moves instead.

Hermes Resposition X. During the second ability window, you may resolve Hermes Move X.

Hide. If you are not in front of the Primordial, you may activate this ability at the end of your turn to become Hidden. If you have the Priority Target token, pass it to the Titan with the highest Rage other than you. 
Hidden. As long as you are Hidden, you have +1 Evasion and +1 Precision. You stop being Hidden if you move in front of the Primordial, gain the Priority Target token, after the second ability window of your Attack, or at the end of your next turn. (Place a generic token on the game element granting you Hide as a reminder.)

Hope X. During the second ability window, place X Hope tokens (X.1.9.7) in the Kratos Pool.

Incinerated. Treat “incinerated” as an Instant Death effect.

Inspire X. During the first ability window, choose up to X Knocked Down Titans, they may immediately stand up.

Jump. At the start of movement, you may activate this ability to ignore up to 1 space of a Terrain tile.
Advanced Jump. Ignore up to 2 spaces instead.

Knockback X. Move the affected miniature X spaces directly away from the source of Knockback in a straight line (or in a specific direction if specified).
From Attacks. If Knockback is caused by a Primordial Attack, it affects the Target(s) only if the Target(s) are within the Attack’s range.
From Responses. If Knockback is caused by a Primordial Response, it affects the Attacker only if they are within adjacency. 
Knocked Back Titans. 
Ignore Terrain except Obstacles. Knocked back Titans ignore all Terrain tiles they move through except Obstacles. 
Destructible Obstacles. If a Titan would be forced to move through a Destructible Obstacle Terrain tile, stop its movement, remove the Terrain tile from the Battle Board and place the Titan in its space, then the Titan suffers CRASH. 
Indestructible Obstacles. If a Titan would be forced to move through an Indestructible Obstacle, it stops on an adjacent space right before the Obstacle instead, then suffers CRASH. 
Knocked Back Primordials. Knocked Back Primordials can move through any Terrain tiles and miniatures without hindrance. They destroy any Terrain tiles (except Indestructible) they move through and cause CRASH and Unavoidable Knockback to Titans as normal. 
Board Edge. If the affected miniature is Knocked Back into a Board Edge, it continues to move along the edge, if possible, away from the source of Knockback. 

Knockdown. Gain the Knockdown Condition card, “Falling down” side up, and tip your miniature on its side. Follow the rules of the Condition card. (Note: the definition of Knockdown used in the Learn to Play is incorrect)
From Attacks. If Knockdown is caused by an Attack, it affects the Target only if it is within the Attack’s range. 
From Responses. If Knockdown is caused by a Response, it affects the Attacker only if they are adjacent. 

Laser Resistance X. Each Laser Attack hit deals X less Danger to you. In Cycle IV+, this loses its Keyword status and becomes a Defensive Statistic instead (V.2.2.4).

Lifeline. When you are about to die from a Chasm space, Displace instead (in Cycle 4, you may instead place the Titan on the closest Irem Tower Terrain tile). Alternatively, when you are about to die from falling from a Boundless Board Edge, stop adjacent to it. This ability can be used even if Knocked Down or otherwise prohibited from using active abilities. 

Light X. No effect in C4.

Lumbering. Cannot be involuntarily moved.

Masterwork. During an Attack Roll, you may reroll 1s with no cost.

Midas X. Place X Midas tokens (X.7.16) on your gear cards.

Midas Immune. Ignore the effects of Midas tokens placed on this particular gear card.

Motivate X. During the second ability window, choose another Titan. That Titan may move up to X spaces. This ability is not required to Stack (I.3.6.1).

Opening X. During the second ability window, place X Opening tokens in the Kratos Pool (X.1.9.2). 

Overbreak X. 
Umbral. (Cycles 1-3 only) During the second ability window, if your Total Power exceeds the AT value by at least 1, place X Break tokens in the Kratos Pool (X.1.9.1).
Illuminated. (Cycles 4-5 only) Break X. Then, if your Total Power exceeds the AT value by at least 1, place up to X additional Break tokens but no more than the exceeded value.

Pass X. During the Clear the Kratos Pool step, choose up to X Opening and/or Break tokens to remain in the Kratos Pool.

Perishable. After you finish resolving a Titan Attack Sequence with this weapon, discard it. (If the sequence is interrupted, it is still considered resolved.)

Precise. During the Draw a BP card step (X.5.6), after drawing the card you may choose to draw the top card of the BP discard instead. If you do, place the first drawn card back into the BP deck and shuffle it.

Provoke. During the first ability window, gain the Priority Target token and turn the Primordial to face you.

Pole Position. During either the First or second ability window, if you’re adjacent to the Primordial, you may place your Titan on any other empty space adjacent to the Primordial.

Power Re-roll X. During the Power Roll step of an Attack, you may re-roll up to X Power dice.

Pull X. Move the affected miniature X spaces towards the source of the Pull, along the shortest possible path.
Other miniatures. The affected miniature can move through spaces occupied by other miniatures. 
Terrain. The affected miniature must resolve the effects of any Terrain tiles it moves through. 
Destructible Obstacles. If a Titan is about to be pulled into a Destructible Obstacle (e.g. a Column), remove the Terrain tile from the Battle Board, the Titan suffers CRASH, then continue the Pull. 
Indestructible Obstacles. If a Titan is about to be pulled into an Indestructible Obstacle, it suffers CRASH and continues to move along the Obstacle’s edge along the shortest possible path towards the Primordial. 
Adjacency. If the affected miniature is or becomes adjacent to the source, the Pull does not end. Instead, move the source directly away from the affected miniature the remaining number of spaces, then finish the Pull. The source’s movement is voluntary, the affected miniature’s movement is involuntary. 
Titan Timing. Titans may use the Pull X keyword during either the first or second ability window. 

Pursuit X. When resolving an AI card, if you’re not a Target, move X spaces in a straight line in the same direction as the Primordial.

Pushback X. Turn the source towards the affected miniature. Then, move X spaces in the direction of the affected miniature, pushing it in a straight line.
Other miniatures. Pushed Titans can move through spaces occupied by other miniatures. If a Titan ends involuntary movement on a space with another miniature, the other miniature is Displaced. 
Terrain. The affected miniature must resolve the effects of any Terrain tiles it moves through. 
Shortest path. If the affected miniature is not adjacent, move the source in its direction along the shortest possible path.
Destructible Obstacles. If a Titan is about to be pushed into a Destructible Obstacle, remove that Terrain tile from the Battle Board, the Titan suffers CRASH, then continue Pushback. 
Indestructible Obstacles. If a Titan is about to be pushed into an Indestructible Obstacle, displace it to an adjacent space that would allow the Primordial to continue movement onto a space previously occupied by the Titan, then continue Pushback. If the Titan dies from displacement, then once the Primordial has moved into the space formerly occupied by the Titan, the Pushback stops. 
Board Edge. If a Titan or Primordial is about to be pushed into the Board Edge, it is displaced to an adjacent space in a way that would allow the source of Pushback to move onto a space previously occupied by the affected miniature, then continue Pushback.
Titan Timing. Titans may resolve the Pushback X keyword during either the first or second ability window of their Attack or when specifically instructed to resolve it immediately.

Quantum. For the purposes of Rapid Adaptation (exclusive to Icarian Harpy), if attacking from the Blindspot, your weapon can have any Weapon Trait.

Ranged Y–X. To attack with this weapon, you must be at least Y and up to X spaces away from your target. This keyword is not stackable.

Reach X. You may attack from up to X spaces away. This keyword is not stackable.

Reduction X. You may reduce involuntary movement suffered by up to X.
Wish Away Reduction X. You may reduce Wish Aways suffered by up to X. 
Pushback Reduction X. You may reduce Pushbacks suffered by up to X. 
Knockback Reduction X. You may reduce Knockbacks suffered by up to X. 
Kickback Reduction X. You may reduce Kickbacks suffered by up to X. 
Pull Reduction X. You may reduce Pulls suffered by up to X. 

Reflex. Move up to 1 space.
Advanced Reflex. 2 spaces instead. 
Superior Reflex. 3 spaces instead. 

Reinforce X. When you are about to resolve an Armor Roll, add X red dice to your Armor dice pool. 
Advanced Reinforce X. Add X black dice instead.
Superior Reinforce X. Add X white dice instead.

Reposition X. During the second ability window, you may move up to X spaces. 

Restricted (Trait). You can equip only one gear card with the list Trait.

Rewind. Place your Titan on your Time Anchor. If your Time Anchor is not on the Board, you are erased from existence instead.

Rocksteady. When you are about to suffer Knockdown, you may use this ability to ignore it.

Rollout. When you are about to suffer Knockdown while adjacent to the Primordial, suffer Knockback 4 instead.

Rouse X. During the second ability window, place X Rouse tokens (X.1.9.6) in the Kratos Pool.

Rush. Move with +1 Speed and perform a Melee/Reach Attack with Auto-break 1. You must move at least 3 spaces and reach your target via the shortest possible path.
Improved Rush. +2 Speed instead and additionally gain +1 Precision on the Attack.

Sacrifice. During the first ability window, you may gain 1 Danger to place one Break token in the Kratos Pool (X.1.9.1).

Scale. When you are about to perform a test to climb a Vantage Point or Elevated Terrain, automatically succeed at that test instead.
Scale X. May be treated as Scale. Otherwise, during the first or second ability window, if you are adjacent to the Primordial, you may immediately climb a VP, move to another VP, or move X spaces up on the Endless Staircase.

Second Chance. After you draw a Trauma or Obol card, you may ignore its effect and discard it. Draw and resolve another card from the same deck (note: a discarded Obol is immediately shuffled back into the Obol deck). You cannot ignore the second draw in any way. This ability can be used even when knocked down or when an effect says that you cannot use any active abilities. 

Shaded. Until the start of the next Titan Round, treat your Titan as being on as shaded space.

Solace. Discard a Mind Condition card or a Despair token from yourself or an adjacent Titan.

Spiral X. During the Attack Roll step, you may reroll up to X hits to lose 1 Fate for each. If you reroll a Crit die this way, the original result does not grant you a Crit Chance.

Spotlight. During the first ability window, if you have the Priority Target token, gain 1 Red Power Die for this Attack.

Stalwart. When you are about to suffer Knockback, you may use this ability to ignore it.

Startup X. When you are about to Attack, if there are no Kratos tokens in the Kratos Pool, place X Opening and/or Break tokens in the Kratos Pool.

Strikeback X. If you fully evade a Primordial Attack, you may immediately move up to X spaces and perform a Combat Action, then gain a Combat Fatigue. This is an Interrupt Attack. If this Ability is used during the Primordial Round, gain 1 Power for the Attack.

Succor. During another Titan’s Power Roll, if, after applying all bonuses, they have less total Power than the AT value by exactly 1 and you are within your weapon range of the Primordial, you may gain 1 Rage, a Combat Fatigue, and discard this weapon to add 1 Power to that Power Roll.

Super Smart Delivery. A Titan with sufficient open hand slots may, as a Free Action or a WoO, equip a gear card with Super Smart Delivery from the Armory and gain 1 Rage.

Superior Chance. Second Chance, but if drawing from Obols, first remove the You died horribly card from that deck for this draw only.

Suppress. When you deal a wound5 (before responses)7, shuffle the discard pile denoted by the subtype into the appropriate deck. (This keyword does not exist without a subtype.)
BP Suppress. Shuffle the BP discard pile into the BP deck. 
AI Suppress. Shuffle the AI discard pile into the AI deck. 

Temporal  Reflex. When you are about to suffer CRASH, ignore it. If you would suffer Unavoidable Knockback, displace instead.

Time-Clocked. Gain the Time-Clocked Condition card, Departing side up and remove your miniature from the board. Follow the rules of the Condition card. 

Tireless. When you are about to activate the Cumbersome keyword, you may ignore it.

Titan Possession. Once you equip this Gear card on a Titan, you have to equip it on this Titan for every subsequent Battle. You may, however, junction this Titan with a different Argonaut.
Argonaut Possession. Once you equip this Gear card on an Argonaut, you have to equip it on that Argonaut’s Titan for every subsequent Battle. 

Transform. Use this ability to flip this Gear card to the other side. This ability can only be used as a free action.

Trick. Weapons with the Transform keyword and Trick may immediately flip to the other side when you meet the Trick condition. (This ignores the free action restriction of the Transform keyword.)
Trauma Trick. You may immediately flip this card after you resolve a Trauma card. 
Wound Trick. You may immediately flip this card after you Wound. 
Fail Trick. You may immediately flip this card after you Fail to Wound. 

Tumble. When you are about to suffer CRASH, roll a d10. On a 6+ ignore it.

Unburden X. During the first or second ability window, give X Condition, Despair, or Ambrosia tokens to the closest Titan. (This does not count as gaining those tokens.)

Unholy Alchemy. Turn all of your Midas tokens into Ambrosia tokens. (This does not count as gaining or discarding either tokens.)
Reverse Unholy Alchemy. Turn all of your Ambrosia tokens into Midas tokens. (This does not count as gaining or discarding either tokens.)

Unique. There can be no more than one instance of a unique card in play or in the Argo Armory at any given time.

Vault. If you are adjacent to the Primordial, place your miniature on an empty space in a straight line from you, on the opposite side of the Primordial, adjacent to it. A Titan may use this ability in either the first or second ability window.
Forced Vault. Same as Vault, but treat it as involuntary movement. If you would have to end this movement outside the Board Edge or on an Indestructible Obstacle Terrain tile, you die instead.

Voluntary Knockdown. You may gain the Knockdown (standing up) Condition card as a free action.

Wish Armor. When you resolve a Wish Attack, you may perform Evasion Rolls and Armor Rolls as if it were a non-Wish Attack. If you exhausted or discarded the gear card that gave you this keyword, you may still use the defensive statistics of that card for this Attack.

Wish Away X. Place the affected Titan on an Irem Tower Terrain tile in front of the Primordial at least X spaces away. If there is no such space, the Titan dies.

Wishcursed. When you trigger Wish Armor, gain 1 Fate.

Wish Dodge. When you are about to resolve an Evasion Roll, gain +1 Evasion bonus for this roll if you used Wish Armor.
Advanced Wish Dodge. +2 Evasion bonus instead.

Wishrod.  During Targeting, if the Attack is a Wish Attack, you may become the Target instead. The Attack gains Doomed.
"""

def parse_abilities(text):
    abilities = {}
    entries = text.strip().split("\n\n")  # Split on double newlines (new keyword)

    for entry in entries:
        lines = entry.split("\n")  # Split on single newlines (subtypes remain together)
        main_name, main_text = lines[0].split(". ", 1)  # Split on the first period

        if main_name not in abilities:
            abilities[main_name] = []

        if len(lines) == 1:
            # No subtypes, just add the main ability
            abilities[main_name].append({"text": main_text, "formatting": ""})
        else:
            # Process subtypes
            abilities[main_name].append({"text": main_text, "formatting": ""})
            for subtype in lines[1:]:
                if subtype[0:1] == "…":
                    abilities[main_name].append({"text": subtype, "formatting": ""})
                else:
                    subtype_name, subtype_text = subtype.split(". ", 1)
                    abilities[main_name].append({"subtype": subtype_name, "text": subtype_text, "formatting": ""})

    return abilities

# Convert to JSON
with open("src\data\JSON\keywords.json", "w", encoding="utf-8") as outfile:
    json.dump(parse_abilities(abilities_text), outfile, indent=2)