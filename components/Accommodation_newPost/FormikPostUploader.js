import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'


const PLACEHOLDER_IMG = 'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png'
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is Required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
  
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

  //function uploads the user's post to firebase with image url, caption and all other fields mentioned below
  const uploadPostToFirebase = (imageUrl, caption, address, no_of_people, status_required, gender, date_move_in, no_of_rooms)=>{
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email) 
      .collection('posts')
      .add({
        topic: 'Accommodation',
        imageUrl: imageUrl, //image-picker
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        address: address,
        no_of_people: no_of_people, //number field
        status_required: status_required, //this dropdown
        gender: gender, //this dropdown
        date_move_in: date_move_in, //date-picker
        no_of_rooms: no_of_rooms, //number field
        owner_email: firebase.auth().currentUser.email
      })
      .then(() => navigation.goBack())
    
    return unsubscribe
  }

  return (
      <Formik
          initialValues={{ caption: '', imageUrl: '', address: '', no_of_people: '', status_required: '', gender: '', date_move_in: '', no_of_rooms: ''}}
          onSubmit={values => {
            uploadPostToFirebase(values.imageUrl, values.caption, values.address, values.no_of_people, values.status_required,values.gender, values.date_move_in, values.no_of_rooms)
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
                      >Accommodation</Text>
                      </View>

                      <TextInput //Caption to post
                        style={{color:'white', fontSize:14, fontWeight: '600', marginBottom: 25, backgroundColor:'#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5}}
                        placeholder='Add a caption'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                      />
                      <TextInput //Address Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='Enter address'
                        placeholderTextColor='gray'
                        keyboardType='email-address'
                        multiline={true}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        />

                        <TextInput //No_of_People Input
                        style={{ color: 'white', fontSize: 14, fontWeight: '600', marginBottom: 25, backgroundColor: '#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5 }}
                        placeholder='No of people for Accommodation'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('no_of_people')}
                        onBlur={handleBlur('no_of_people')}
                        value={values.no_of_people}
                        keyboardType='numeric'
                        />

                      <Text style={{color:'white', fontWeight:'700'}}>Select Your Status:</Text>
                      <Picker //Picker for Gender
                        style={{color:'white', fontSize: 14, marginBottom: 25}}
                        itemStyle={{ color: 'white', fontWeight: '700', fontSize: 14 }}
                        selectedValue={values.status_required}
                        onValueChange={handleChange('status_required')}>
                        <Picker.Item label="student" value="student" />
                        <Picker.Item label="working proffessional" value="working proffessional" />
                        <Picker.Item label="PR" value="PR" />
                        <Picker.Item label="citizen" value="citizen" />
                        <Picker.Item label="refugee" value="refugee" />
                      </Picker>
                      
                      <Text style={{color:'white', fontWeight:'700'}}>Select Gender:</Text>
                      <Picker //Picker for Gender
                        style={{color:'white', fontSize: 14, marginBottom: 25}}
                        itemStyle={{ color: 'white', fontWeight: '700', fontSize: 14 }}
                        selectedValue={values.gender}
                        onValueChange={handleChange('gender')}>
                        <Picker.Item label="male" value="male" />
                        <Picker.Item label="female" value="female" />
                        <Picker.Item label="transgender" value="transgender" />
                        <Picker.Item label="gender neutral" value="gender neutral" />
                        <Picker.Item label="non-binary" value="non-binary" />
                        <Picker.Item label="genderqueer" value="genderqueer" />
                      </Picker>

                      <TextInput //Date to Move In Input
                        style={{color:'white', fontSize:14, fontWeight: '600', marginBottom: 25, backgroundColor:'#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5}}
                        placeholder='Date to Move In This Accommodation'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('date_move_in')}
                        onBlur={handleBlur('date_move_in')}
                        value={values.date_move_in}
                        />

                      <TextInput //No Of Rooms Input
                        style={{color:'white', fontSize:14, fontWeight: '600', marginBottom: 25, backgroundColor:'#0F0D11', paddingTop: 10, padding: 10, borderRadius: 5}}
                        placeholder='No of Rooms in this Accommodation'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('no_of_rooms')}
                        onBlur={handleBlur('no_of_rooms')}
                        value={values.no_of_rooms}
                        />

                      <Image //Image to post
                        source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
                        style={{width:300, height:300, marginBottom: 10, borderRadius: 5}}
                      />
                      <Divider width={0.2} orientation='vertical' style={{marginBottom: 20}}/>
                      <TextInput //Image URL
                        onChange={e=> setThumbnailUrl(e.nativeEvent.text)}
                        style={{color:'white', fontSize:14, fontWeight: '500',}}
                        placeholder='Enter Image Url'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                        />

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