import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

export const categories =[
    {
        label:'Beach',
        icon: TbBeach,
        description : 'This property is close to a beach.'
    },
    {
        label:'Windmills',
        icon: GiWindmill,
        description : 'This property has windmills.'
    },
    {
        label:'Modern',
        icon: MdOutlineVilla,
        description : 'This property has modern style.'
    },
    {
        label:'Conutryside',
        icon: TbMountain,
        description : 'This property in countryside.'
    },
    {
        label:'Pools',
        icon: TbPool,
        description : 'This property has a pool.'
    },
    {
        label:'Island',
        icon: GiIsland,
        description : 'This property on an island.'
    },
    {
        label:'Lake',
        icon: GiBoatFishing,
        description : 'This property is close to lake.'
    },
    {
        label:'Skiing',
        icon: FaSkiing,
        description : 'This property has skiing activities.'
    },
    {
        label:'Catsle',
        icon: GiCastle,
        description : 'This property is in a castle.'
    },
    {
        label:'Campping',
        icon: GiForestCamp,
        description : 'This property has camping activities.'
    },
    {
        label:'Arctic',
        icon: BsSnow,
        description : 'This property is in arctic.'
    },
    {
        label:'Caves',
        icon: GiCaveEntrance,
        description : 'This property is in cave.'
    },
    {
        label:'Desert',
        icon: GiCactus,
        description : 'This property is in desert.'
    },
    {
        label:'Barn',
        icon: GiBarn,
        description : 'This property is in barn.'
    },
    {
        label:'Lux',
        icon: IoDiamond,
        description : 'This property is luxurious.'
    },

]