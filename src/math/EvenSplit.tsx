interface Prop{
    total: number;
    members: number;
}

function EvenSplit(props: Prop){
    let split: number;
    split = props.total/props.members
    console.log (split);
    return split
}

export default EvenSplit;