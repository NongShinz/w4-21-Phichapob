import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useState, useEffect} from "react";

export default function Home(){
    const [text, setText] = useState("")
    const [fruit, setFruit] = useState("")

    // สั่งให้โหลดค่าตอนเปิดแอป
    useEffect(() => {
        loadFruit()
    }, [])
    // ฟังก์ชันบันทึก
    async function saveFruit(){
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    // ฟังก์ชันโหลดค่า
    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if(data != ""){
            setFruit(data!.toString())
        }
    }

    // ฟังก์ชั่นลบค่า
    async function removeFruit() {
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }

    return (
        <View style={myStyle.container}>
            <Text style={[myStyle.box2, myStyle.text1]}>Fruit Save</Text>

            {/*  แสดงสิ่งที่บันทึก */}
             <Text style={[myStyle.box3, myStyle.text1]}>Fruit : {fruit}</Text>

            {/* รับข้อความ */}
             <TextInput style={myStyle.input} value={text} onChangeText={setText}/>

             {/* ปุ่มบันทึก */}
             <TouchableOpacity onPress={saveFruit} style={myStyle.box}>
                 <Text>บันทึก</Text>
             </TouchableOpacity>

             {/* ปุ่มลบ */}
              <TouchableOpacity onPress={removeFruit} style={myStyle.box}>
                <Text>ลบ</Text>
           </TouchableOpacity>
        </View>
    )
}

const myStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"lightblue",
        borderColor:"black"
    },
    input:{
        borderWidth:2,
        width:"80%",
        borderRadius:8,
        backgroundColor: "white",
        height:"5%"
    },
    box:{
        width:"50%",
        height:40,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop:10
    },
    box2:{
        width:"50%",
        height:40,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 8,
        margin:10,
        textAlign: "center"
    },
    box3:{
        width:"70%",
        height:40,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 8,
        margin:10,
        textAlign: "center",
    },
    text1:{
        fontSize:20,
        fontWeight:"bold"
    }
})
