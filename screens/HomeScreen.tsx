import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useQuery, gql } from '@apollo/client';


//TODO put apollo stuff in a store folder

interface User {
    _id: String
    username: String,
    email: String
}
interface Lessons {
    _id: String
    name: String,
    startDate: String
    endDate: String
    users: User[]
}

// const GET_LESSONS = gql`
//  query Lessons {
//   lessons {
//     _id
//     name
//     startDate
//     endDate
//     users {
//       _id
//       username
//       email
//     }
//   }
// }
// `;

// const GetAllLessons = () => {
//     const {loading, error, data} = useQuery<Lessons>(GET_LESSONS);

//     if(error) {
//         console.log({error})
//         throw new Error(error.message)
//     }

//     return {
//         loading,
//         data,
//     }
// }

const HomeScreen = () => {

    // const { loading, data } = GetAllLessons()

    // if (loading) console.log('loading...')
    // if(data) {
    //   console.log(data)
    // }

    return (
        <View style={styles.screen}>
            <Text>Hello world</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
})
