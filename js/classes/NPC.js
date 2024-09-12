import { Character } from "./character";
import { DIRECTION } from "../tools/constantes";

export class NPC extends Character {
    constructor(url, x, y, direction, tirade) {
        super(url, x, y, direction);

        if (tirade) {
            this.tirade = tirade;
        }
    }

    turn(direction) {
        if (direction == DIRECTION.HAUT)
            this.direction = DIRECTION.BAS

        if (direction == DIRECTION.BAS)
            this.direction = DIRECTION.HAUT

        if (direction == DIRECTION.GAUCHE)
            this.direction = DIRECTION.DROITE

        if (direction == DIRECTION.DROITE)
            this.direction = DIRECTION.GAUCHE

    }

    checkDeplacement(nextCase, map) {
        // check du tableau de Map.allItemObs
        const items = map.alltabs.Items;
        const obstacles = map.alltabs.Obs;
        const npcs = map.alltabs.PNG;

        if (nextCase.x < -1 || nextCase.y < -1 || nextCase.x > map.width || nextCase.y > map.height) {
            return false;
        }

        if (items.length) {
            //verification for objet
            for (let item of items) {
                if (!item.decor) {
                    if (Math.round(((item.x * 32) + item.l) / 32) > 2 || Math.round(((item.y * 32) + item.h) / 32) > 2) {
                        if (nextCase.x >= item.x && nextCase.y < Math.round(((item.y * 32) + item.h) / 32) && nextCase.x < Math.round(((item.x * 32) + item.l) / 32) && nextCase.y >= item.y) {
                            return false
                        }
                    } else if (nextCase.x >= item.x && nextCase.y <= item.y && nextCase.x <= item.x && nextCase.y >= item.y) {
                        return false
                    }
                } else {
                    if (nextCase.x >= item.x && nextCase.x < Math.round(((item.x * 32) + item.l) / 32) - 1 && nextCase.y > Math.round(((item.y * 32) + (item.h / 2)) / 32) && nextCase.y <= Math.round(((item.y * 32) + item.h) / 32) - 1) {
                        return false
                    }
                }
            }
        }

        if (obstacles.length) {
            for (let obstacle in obstacles) {
                if (obstacle.height >= 5 || obstacle.width >= 5) {
                    if (nextCase.x >= obstacle.x && nextCase.x < obstacle.x + obstacle.width && nextCase.y >= obstacle.y + (obstacle.height / 2) && nextCase.y <= obstacle.y + obstacle.height) {
                        return false
                    }
                } else if (obstacle.height > 2 || obstacle.height > 2) {
                    if (nextCase.x >= obstacle.x + 1 && nextCase.x < obstacle.x + (obstacle.width - 1) && nextCase.y > obstacle.y + (obstacle.height - 2) && nextCase.y <= (obstacle.y + obstacle.height)) {
                        return false
                    }
                } else if (obstacle.height <= 2 || obstacle.width <= 2) {
                    if (nextCase.x >= obstacle.x && nextCase.x < (obstacle.x + obstacle.width) && nextCase.y > obstacle.y + (obstacle.height - 1) && nextCase.y <= (obstacle.y + obstacle.height)) {
                        return false
                    }
                }
            }
        }

        if (npcs.length) {
            for (let npc in npcs) {
                if (nextCase.x >= npc.x && nextCase.y <= npc.y && nextCase.x <= npc.x && nextCase.y >= npc.y)
                    return false;
            }
        }
    }
}
