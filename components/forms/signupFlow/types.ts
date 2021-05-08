export enum OBJECTIVES {
    UP = 'Prendre du poids',
    DOWN = 'Perdre du poids',
    HEALTH_FOOD = 'Améliorer mon alimentation',
}

export enum DIET {
    VEGETARIAN = 'Végétarien',
    VEGAN = 'Végan',
    FLEX = 'Flexitarien',
    OTHER = 'Autre',
}

export interface SignUpInfos {
    objective: OBJECTIVES | null;
    height: number | '';
    weight: number | '';
    diet: DIET | null;
}

export interface SignUpInfos {
    objective: OBJECTIVES | null;
    height: number | '';
    weight: number | '';
    diet: DIET | null;
}
