export const DUREE_ANIMATION = 4;
export const DUREE_DEPLACEMENT = 15;
export const SPEED = 32;
export const MAX_SIZE_HEIGHT_IMAGE = 32
export const DIRECTION = {
    "BAS": 0,
    "GAUCHE": 1,
    "DROITE": 2,
    "HAUT": 3
};

export const FPS = 30;
export const INTERVAL = 1000 / FPS;
export const STEP = INTERVAL / 1000 // seconds
export const FIVE_MINUTES = 300000;

export const MOVEMENT_AXES = {
    NONE: "none",
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    BOTH: "both"
};

export const SIZE_CASE = 32;
export const MIDDLE_SIZE_CASE = SIZE_CASE / 2;

export const ACTION = {
    "ATTRAPER": 0,
    "JETER": 1,
    "DIALOGUE": 2,
    "PNGDIALOG": 3

}

export const FILE_SYSTEMS = "/home/maboul/dev/SortGame/";

export const IMAGES = `${FILE_SYSTEMS}images/`;
export const DECOR_FOLDER = `${FILE_SYSTEMS}decor/`;
export const SPRITES_FOLDER = `${FILE_SYSTEMS}sprites/`;
export const TILESET_FOLDER = `${FILE_SYSTEMS}tilesets/`;
export const WASTES_FOLDER = `${FILE_SYSTEMS}wastes/`;

export const JSONS_FOLDER = `${FILE_SYSTEMS}map_elements/`;
export const ITEMS_JSON_FOLDER = `${JSONS_FOLDER}items/`;
export const MAPS_JSON_FOLDER = `${JSONS_FOLDER}maps/`;
export const NPCS_JSON_FOLDER = `${JSONS_FOLDER}NPCS/`;
export const OBSTACLES_JSON_FOLDER = `${JSONS_FOLDER}obstacles/`;
