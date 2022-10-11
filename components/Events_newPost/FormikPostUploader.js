
import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMG = 'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png'
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is Required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
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
  const uploadPostToFirebase = (imageUrl, caption, address, event_name, event_date, age_restriction, ticket_price)=>{
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email) 
      .collection('posts')
      .add({
        topic: topic,
        imageUrl: imageUrl,
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
        event_date: event_date,
        age_restriction: age_restriction,
        ticket_price: ticket_price
        //Add some restrictions
      })
      .then(() => navigation.goBack())
    
    return unsubscribe
  }

  return (
      <Formik
          initialValues={{ caption: '', imageUrl: '', address: '',event_name: '', event_date: '', age_restriction: '', ticket_price: ''}}
          onSubmit={values => {
            uploadPostToFirebase(values.imageUrl, values.caption, values.address, values.event_name, values.event_date, values.age_restriction, values.ticket_price)
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
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Enter address'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        />

                      <TextInput //Event Name Input
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Enter Event Name'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('event_name')}
                        onBlur={handleBlur('event_name')}
                        value={values.event_name}
                        />

                      <TextInput //Event Date Input
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Enter Event Date'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('event_date')}
                        onBlur={handleBlur('event_date')}
                        value={values.event_date}
                        />

                      <TextInput //Age Restriction Input
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Enter Age Restriction'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('age_restriction')}
                        onBlur={handleBlur('age_restriction')}
                        value={values.age_restriction}
                        />

                      <TextInput //Ticket Price Input
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Enter Ticket Price'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('ticket_price')}
                        onBlur={handleBlur('ticket_price')}
                        value={values.ticket_price}
                        />

                      <TextInput //Caption to post
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Add a caption'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
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