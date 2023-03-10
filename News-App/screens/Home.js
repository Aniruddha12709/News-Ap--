import { View, Text, ScrollView, TouchableOpacity, Image ,StyleSheet,SafeAreaView,StatusBar,ImageBackground} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';



export default function Home({navigation}) {
  const [data, setData] = useState([]);
  


  
 
  
  //console.log(data);
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&category&apiKey=1f804abc9bf5432db60cbe929928d81f";

  const getArticles = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      .then(()=>console.log(data))
      
      .catch((err) => console.log(err));
  };

 const logout=()=>{
  
  firebase.auth().signOut().then(() => {
    alert("Logged out");
    //const navigate = useNavigate();
    navigation.replace('Login');
   }).catch((error) => {
     alert("Something went wrong!Try Again");
   });
 
}



  useEffect(() => {
    getArticles();
  }, []);
  return (
    <>
      {Object.keys(data).length > 0 && (
        
        <ImageBackground source={require('../assets/Business.jpeg')} resizeMode="contain" style={{ flex: 1, marginTop:'10%'}}>
 
                       
          <View style={{flexDirection: 'row',width:'90%', marginTop:'3%',marginLeft:'3%' ,marginRight:'3%', justifyContent:'space-between'}}>
            <View style={{backgroundColor:'#0096FF',borderRadius:10,width:150,height:40}}><Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Headlines</Text></View>

          
          <TouchableOpacity onPress={() => { logout() }}>
          <AntDesign name="logout" size={24} color="#0096FF" alignSelf="right" />
          </TouchableOpacity> 
          </View>
      
          
          <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 5,
              borderRadius:15,
            }}
          >
            {data.articles.map((article, index) => (
              <View key={index} style={{flex:1}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 15,
                    backgroundColor:'#bcd4e6',
                    marginTop:'5%',
                    width:'90%',
                    alignItems:'center',
                    paddingLeft:'5%',
                    marginLeft:'5%', 
                    borderRadius:30
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginTop:'5%' }}>
                    {article.title}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: article.urlToImage }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                
                  <View style={{flex:1}}>
                <Text style={{ fontSize: 16, marginLeft:'5%',fontWeight:'bold' }}>{article.description}</Text>
                </View>
                
              </View>
            ))}
          </View>
          </ScrollView>
        </ImageBackground>
       
      )}
    </>
  );
}