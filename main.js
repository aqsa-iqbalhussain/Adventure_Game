#! /usr/bin/env node
import inquirer from "inquirer";
//game variable
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
//player variable
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
// while loop condition
let gameRunning = true;
console.log("Wellcome to DeadZone!");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`${enemy} has appeared \n`);
    while (enemyHealth > 0) {
        console.log(`your health ${heroHealth}`);
        console.log(`${enemy} health: ${enemyHealth}`);
        let options = await inquirer.prompt([
            {
                name: "ans",
                type: "list",
                message: "what would you like to do?",
                choices: ["Attack", "Health Potion", "Run"],
            },
        ]);
        if (options.ans === "Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`you Strike ${enemy} for ${damageToEnemy}`);
            console.log(`${enemy} strike you for ${damageToHero}`);
            if (heroHealth < 1) {
                console.log("you have taken too much damage. you are too weak to continue.");
                break;
            }
        }
        else if (options.ans === "Health Potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(`you use health Potion for ${healthPotionHealAmount}`);
                console.log(`you now have ${heroHealth}  health`);
                console.log(`you have ${numHealthPotion} health potion left.`);
            }
            else {
                console.log("you have no health potion left. defeat enemy for a chance get health potion");
            }
        }
        else if (options.ans === "Run") {
            console.log(`you run away from the ${enemy}`);
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(`you are out from battle.`);
        break;
    }
    console.log(`${enemy} was defeated!`);
    console.log(`you have ${heroHealth} health.`);
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotion++;
        console.log(`enemy give you health potion`);
        console.log(`your health is ${heroHealth}`);
        console.log(`your health potion is ${numHealthPotion}`);
    }
    let userOption = await inquirer.prompt([
        {
            name: "ans",
            type: "list",
            message: "what would you like to do?",
            choices: ["1. Continue", "2. Exit"],
        },
    ]);
    if (userOption.ans === "1. Continue") {
        console.log("you are continue on your adventure");
    }
    else {
        console.log("you successfully exit from the Deadzone");
        break;
    }
    console.log("Thank you for playing.\n");
}
