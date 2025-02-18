export default function die(props){
    const styles={
        backgroundcolor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <button style={styles}>{props.value}</button>
    )
}