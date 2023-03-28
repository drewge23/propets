import logo from '../images/proPets.png'
import logoBig from '../images/proPets2.png'
import puppy from '../images/puppy.png'
import allPets from '../images/allPets2.png'
import lensPawBig from '../images/lensPaw2.png'
import profilePhoto from '../images/profile1.jpg'

export {logo, logoBig, puppy, allPets, lensPawBig, profilePhoto}

export function getPostTime(createdAt) {
    const currentTime = Date.now()         //в миллисекундах сейчас со временем для сравнений
    const currentDateWithTime = new Date() //в миллисекундах сейчас со временем для подсчета дня без времени
                                           //дата сегодня ( при вычитании считывается в миллисекундах)
    const currentDate = new Date(currentDateWithTime.getFullYear(), currentDateWithTime.getMonth(), currentDateWithTime.getDate())
    const currentYear = new Date(currentDateWithTime.getFullYear())
    const postsTimeInMSeconds = createdAt.toMillis() // дата и время создания поста в миллисекундах
    const postDateArr = new Date(postsTimeInMSeconds).toString().split(' ') // создания поста Thu Mar 16 2023 22:14:54 GMT+0200 (Израиль, стандартное время)

    const postDate = postDateArr[2] + ' ' + postDateArr[1]
    const postDateWithYear = postDateArr[2] + ' ' + postDateArr[1] + ' ' + postDateArr[3]


    const minute = 60 * 1000
    const minute5 = 60 * 1000 * 5
    const minute10 = 60 * 1000 * 10
    const minute15 = 60 * 1000 * 15
    const minute30 = 60 * 1000 * 30
    const hour = 60 * 60 * 1000
    const hour2 = 60 * 60 * 1000 * 2
    const hour3 = 60 * 60 * 1000 * 3
    const hour4 = 60 * 60 * 1000 * 4
    const hour5 = 60 * 60 * 1000 * 5
    const hour6 = 60 * 60 * 1000 * 6
    const hour7 = 60 * 60 * 1000 * 7
    const today = currentTime - currentDate
    const thisYear = currentTime - currentYear

    const differentTime = currentTime - postsTimeInMSeconds

    if (differentTime < minute) return 'now'
    else if (differentTime >= minute && differentTime < minute5) return '1 minute ago'
    else if (differentTime >= minute5 && differentTime < minute10) return '5 minutes ago'
    else if (differentTime >= minute10 && differentTime < minute15) return '10 minutes ago'
    else if (differentTime >= minute15 && differentTime < minute30) return '15 minutes ago'
    else if (differentTime >= minute30 && differentTime < hour) return '30 minutes ago'
    else if (differentTime >= hour && differentTime < hour2) return '1 hour ago'
    else if (differentTime >= hour2 && differentTime < hour3) return '2 hours ago'
    else if (differentTime >= hour3 && differentTime < hour4) return '3 hours ago'
    else if (differentTime >= hour4 && differentTime < hour5) return '4 hours ago'
    else if (differentTime >= hour5 && differentTime < hour6) return '5 hours ago'
    else if (differentTime >= hour6 && differentTime <= hour7) return '6 hours ago'
    else if (differentTime >= hour7 && differentTime <= today) return 'Today'
    else if (differentTime > today && differentTime < thisYear) return postDate
    else return postDateWithYear
}

export function copyToBuffer(data) {
    if (data) {
        navigator.clipboard.writeText(data)
        alert('Information copied')
    } else
        alert('Nothing to copy!')
}