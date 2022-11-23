
import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import { Button} from 'react-native-elements'
import { db, firebase } from '../../firebase'
import * as ImagePicker from 'expo-image-picker';

const PLACEHOLDER_IMG = 'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png'
const uploadPostSchema = Yup.object().shape({
  //imageUrl: Yup.string().url().required('A URL is Required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})

const FormikPostUploader = ({navigation}) => {
  
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  
  //gets the image url and the username/email of the user that is currently logged in
  const getUsername = () => {
    const user = firebase.auth().currentUser 
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)  //how to use where statement
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          })
        }))
    return unsubscribe
  }

  useEffect(() => {
    getUsername()
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const uploadImage = async() => {
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const childPath = `post/${firebase.auth().currentUser.email}/${Math.random().toString(36)}}`;
        const task = firebase.
        storage().
        ref().
        child(childPath)
        .put(blob);
  
        const taskProgress = snapshot => {
          console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
  
        const taskCompleted =() => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            setImageURL(downloadURL);
          })
        }
  
        const taskError = snapshot => {
          console.log(snapshot)
        }
  
        task.on("state_changed", taskProgress, taskError, taskCompleted);
      }
      console.log(result.assets[0].uri);
      uploadImage();

    }
  };

  //function uploads the user's post to firebase with image url, caption and all other fields mentioned below
  const uploadPostToFirebase = (caption, address, event_name, event_date, ticket_price)=>{
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email) 
      .collection('posts')
      .add({
        topic: 'Events',
<<<<<<< HEAD
        imageUrl: imageURL, //image-picker
=======
        imageUrl: imageUrl, //image-picker
>>>>>>> 35f32a78da2a44634038756cc630db8e656a63d0
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        comments: [],
        address: address,
        event_name: event_name,
        event_date: event_date, //date-picker
<<<<<<< HEAD
        ticket_price: ticket_price //number-field
=======
        // age_restriction: age_restriction, //dropdown
        ticket_price: ticket_price, //number-field
        owner_email: firebase.auth().currentUser.email
>>>>>>> 35f32a78da2a44634038756cc630db8e656a63d0
        //Add some restrictions
      })
      .then(() => navigation.goBack())
    
    return unsubscribe
  }

  return (
      <Formik
          initialValues={{ caption: '', address: '',event_name: '', event_date: '', ticket_price: ''}}
          onSubmit={values => {
            uploadPostToFirebase(values.caption, values.address, values.event_name, values.event_date, values.ticket_price)
            //addTopicToFirebase(values.topic)
          }}
          validationSchema={uploadPostSchema}
          validateOnMount={true}
      >
          {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, }) =>
              <>
                  <View
                      style={{
                        marginHorizontal: 30,
                        marginVertical: 20,
                        justifyContent: 'space-between',
                        flexDirection:'column', 
                      }}>
                      
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{ color: 'white', fontWeight: '700', marginBottom: 25, opacity: .8 }}>Topic:  </Text>
                          
                      <Text //topic to post to
                        style={{ color: '#F24A72',opacity: 0.8, fontWeight: '500', marginBottom: 25, textAlign: 'center' }}
                      >Events</Text>
                      </View>

                      <TextInput //Address Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Enter address'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        />

                      <TextInput //Event Name Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Enter Event Name'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('event_name')}
                        onBlur={handleBlur('event_name')}
                        value={values.event_name}
                        />

                      <TextInput //Event Date Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Enter Event Date'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('event_date')}
                        onBlur={handleBlur('event_date')}
                        value={values.event_date}
                        />

                      <TextInput //Ticket Price Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Enter Ticket Price'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('ticket_price')}
                        onBlur={handleBlur('ticket_price')}
                        value={values.ticket_price}
                        />

                      <TextInput //Caption to post
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Add a caption'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                      />
                      
                      <Image //Image to post
                        source={{ uri: image }}
                        style={{width:300, height:300, marginBottom: 10, borderRadius: 5}}
                      />

                      <Button title="Pick Image from Gallery" onPress={() => pickImage()} />


                      {errors.imageUrl && (
                          <Text style={{fontSize: 12, color: '#30AADD'}}>
                              {errors.imageUrl}
                          </Text>
                      )}

                      <Button
                        onPress={handleSubmit}
                        title='Post' disabled={!isValid}
                        style={{marginTop: 20}}/>
                    </View>
              </>
          
          }
    </Formik>
  )
}

export default FormikPostUploader