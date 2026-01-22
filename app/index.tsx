import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from "react"

export default function Home(){
    const [text, setText] = useState("")
    const [fruit, setFruit] = useState("")

    // สั่งให้โหลดค่าตอนเปิดแอป
    useEffect(() => {
        loadFruit()
    }, [])

    // ฟังก์ชั่นบันทึก
    async function saveFruit(){
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    // ฟังก์ชั่นโหลดค่า (แก้ไขแล้ว)
    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if (data !== null) {
            setFruit(data)
        }
    }

    // ฟังก์ชั่นลบ
    async function removeFruit() {
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }

    return(
        <View style={myStyles.container}>
            {/* แสดงสิ่งที่บันทึก */}
            <Text style={myStyles.fruitText}>Fruit : {fruit}</Text>

            {/* รับข้อความเข้ามา */}
            <TextInput
                style={myStyles.input}
                value={text}
                onChangeText={setText}
            />

            {/* ปุ่มบันทึก */}
            <TouchableOpacity style={myStyles.saveButton} onPress={saveFruit}>
                <Text>บันทึก</Text>
            </TouchableOpacity>

            {/* ปุ่มลบ */}
            <TouchableOpacity style={myStyles.saveButton} onPress={removeFruit}>
                <Text>ลบ</Text>
            </TouchableOpacity>
        </View>
    )
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFCC80"
    },
    input:{
        borderWidth:1,
        width:"80%",
        margin:15,
        padding:10,
        borderEndWidth:1.5,
        borderRadius:10,
        backgroundColor:"#FFFFFF",
        color:"#000000"
    },
    saveButton:{
        backgroundColor:"#B3E5FC",
        width:"50%",
        paddingVertical:12,
        borderRadius:10,
        alignItems:"center",
        marginBottom:10,
        borderWidth:1.5,
        borderColor:"#000000"
    },
    fruitText:{
        backgroundColor:"#B3E5FC",
        width:"50%",
        paddingVertical:12,
        borderRadius:10,
        marginBottom:15,
        borderWidth:1.5,
        borderColor:"#000000",
        textAlign:"center"
    }
})