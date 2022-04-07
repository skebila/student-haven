import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'


const PLACEHOLDER_IMG = 'https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png'
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is Required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)


  return (
      <Formik
          initialValues={{ caption: '', imageUrl: '' }}
          onSubmit={values => {
              console.log(values)
              console.log('Your post was submitted successfully')
              navigation.goBack()
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
                      
                      <View style={{flexDirection: 'row'}}>
                          <Text style={{ color: 'white', fontWeight: '500', marginBottom: 25, opacity: .5 }}>Posting to </Text>
                          <Text //displays selected topic to post to
                              style={{ color: '#F24A72', fontWeight: '700', marginBottom: 25, }}>Events </Text>
                      </View>

                      <TextInput //Caption to post
                        style={{color:'white', fontSize:20, fontWeight: '700', marginBottom: 25}}
                        placeholder='Add a caption ...'
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