const encBtn = document.getElementById("submitEncrypt")
const encMsg = document.getElementById("msgEncrypt")
const pubKey = document.getElementById("recieverPublicKey")
const encMsgShow = document.getElementById("enc")
const pubshow = document.getElementById("public")
const privshow = document.getElementById("private")
const encryptedKey = document.getElementById("encryptedKey")
const decBtn = document.getElementById("submitDecrypt")
const decMsg = document.getElementById("msgDecrypt")
const encSymKey = document.getElementById("encryptedSymmatricKey")
const privKey = document.getElementById("recieverPrivateKey")
const decMsgShow = document.getElementById("dec")

const letterArray = ["A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z" , "@" , "#" , "$" , "%" , "&"]

const sbox = [
    [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76],
    [0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0],
    [0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15],
    [0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75],
    [0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84],
    [0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf],
    [0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8],
    [0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2],
    [0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73],
    [0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb],
    [0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79],
    [0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08],
    [0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a],
    [0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e],
    [0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf],
    [0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]
]
  
const rcon = [
    0x00000000, 0x01000000, 0x02000000, 0x04000000, 
    0x08000000, 0x10000000, 0x20000000, 0x40000000, 
    0x80000000, 0x1B000000, 0x36000000
]

const mixColumnMatrix = [
    [0x02, 0x03, 0x01, 0x01],
    [0x01, 0x02, 0x03, 0x01],
    [0x01, 0x01, 0x02, 0x03],
    [0x03, 0x01, 0x01, 0x02]
]

const primeHex = [
    "0x1682902197723fa804b10ab6e3565b5f",
    "0xf348121c044c8236545bf429fb741fb5",
    "0x99d4e78c4d3d4bbc24f3c8488a6199d",
    "0x4ae52db5c2285844c0fba9f9e92e3aa5",
    "0x9d4eb8fe6e1734242a2fdfe16d6e0d9f",
    "0xa5042d496610b8b6eba83a8386bfcc11",
    "0x37f3152f0288bb226f9afa4f16d8ac81",
    "0x654fc963324df19d8c757ba46eafd3ed",
    "0xf2e05a6e4092386abe812ef0ebb17541",
    "0x494cd684fef6d8511f58f72282680c7d",
    "0xe95bb4d574cd239115cd689f51638449",
    "0xf1d821d23e9743087ce4a0d4bc70809",
    "0x6dbf1cfae21e58af780fb9f81f45d017",
    "0xc897575887cbe85931e6f5263b0f57f1",
    "0xe01b5280cdafd2eef76bf578483bb5a9",
    "0x331086acd49337f76475b552ebd238e3",
    "0x39d02770a8f40e227af39c51dde25e5f",
    "0x8448364a7e0d9fc25dae5f9313d98dad",
    "0xe84e83e023bb5d1c3ca21444d892a93",
    "0xcd38c80143baa02f55629bb7a6953665"
]
 
const invSbox = [
    [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb],
    [0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb],
    [0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e],
    [0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25],
    [0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92],
    [0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84],
    [0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06],
    [0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b],
    [0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73],
    [0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e],
    [0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b],
    [0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4],
    [0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f],
    [0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef],
    [0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61],
    [0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]
]

const invMixColumnMatrix = [
    [0x0e, 0x0b, 0x0d, 0x09],
    [0x09, 0x0e, 0x0b, 0x0d],
    [0x0d, 0x09, 0x0e, 0x0b],
    [0x0b, 0x0d, 0x09, 0x0e]
]

    
  
                                    /* Functions */

/* Extra functions for AES KEY Expansion */

function rotWord(x) {
    x = [...x]
    let temp = []

    for (let i = 0 ; i < x.length - 2 ; i+=2) { /* No need for changing the last one */
        temp[0] = x[i]
        temp[1] = x[i+1] /* A manual left shift , For AB CD EF GH */
        x[i] = x[i+2]    /* CD AB EF GH Then CD EF AB GH Lastly CD EF GH AB */
        x[i+1] = x[i+3]
        x[i+2] = temp[0]
        x[i+3] = temp[1]
    }
    return x
}

function subWord(x) {
    x = [...x]

    for (let j = 0 ; j < x.length ; j++) {
        if (x[j] == "a" | x[j] == "b" | x[j] == "c" | x[j] == "d" | x[j] == "e" | x[j] == "f") {
            x[j] = parseInt(x[j] , 16) /* This takes the string as hexa and gives decimal */
            /* Solves the problem I was having with x["f"] */
        }
    }

    for (let i = 0 ; i < x.length ; i+=2) {
        let temp = sbox[x[i]][x[i+1]].toString(16).padStart(2 , 0)
        x[i] = temp[0]
        x[i+1] = temp[1]
    }
    return x
}


/* Random AES Key generator */

function AESKeyGenerate(AESKEY) {
    for (let i = 0 ; i < 16 ; i++) {
        let randomNum = Math.floor(Math.random() * letterArray.length) /* No need for +1 because selecting from array */
        AESKEY[i] = letterArray[randomNum]
    }

    /* Converting AES KEY to HEXA */

    for (let i = 0 ; i < AESKEY.length ; i++) {
        AESKEY[i] = AESKEY[i].charCodeAt().toString(16).padStart(2 , 0) /* charCodeAt gives ASCII Code, toString(16) makes it Hexa Number in string , pad start to pad with leading 0 if needed */
    }
    return AESKEY
}


/* Key Expansion for AES-128 */

function keyExpansion(AESKEY , ENCRYPTKEYEXPANSION) {

    let i = 0

    for (let j = 0 ; j < AESKEY.length ; j+=4) {
        ENCRYPTKEYEXPANSION[i] = AESKEY[j]+AESKEY[j+1]+AESKEY[j+2]+AESKEY[j+3]
        i++
    }

    /* Key Expansion */

    let k = 4

    while(k < 44) {  /* as 11 round, 4*11 */
        
        if (k % 4 == 0) {   /* if it is first column */

            /* Calculating t */

            let t = []
            let subRotAns = subWord(rotWord([...ENCRYPTKEYEXPANSION[k-1]]))
            let rconAns = rcon[Math.trunc(k/4)].toString(16)
            rconAns = [...rconAns]

            if (rconAns.length != 8) {
                rconAns.unshift('0') /* If there was a leading zero */
            }
  
            for (let i = 0 ; i < subRotAns.length ; i+=2) {
                let t1 = parseInt((subRotAns[i] + subRotAns[i+1]) , 16)
                let t2 = parseInt((rconAns[i] + rconAns[i+1]) , 16)
                t.push(t1 ^ t2)
            }

            /* Generating key for first column */

            let keyExp0 = []
            let word0Col = [...ENCRYPTKEYEXPANSION[k-4]]
            let l = 0

            for (let i = 0 ; i < word0Col.length ; i+=2) {
                let temp = parseInt((word0Col[i] + word0Col[i+1]) , 16)
                keyExp0.push((t[l] ^ temp).toString(16).padStart(2 , 0))
                l++
            }

            ENCRYPTKEYEXPANSION.push(keyExp0[0]+keyExp0[1]+keyExp0[2]+keyExp0[3]) /* As KeyExp Size is fixed, hand written is not problem here */
        } else {

            /* Generating Key for else */

            let keyExp = []
            let prevW = [...ENCRYPTKEYEXPANSION[k-1]]
            let prevUpW = [...ENCRYPTKEYEXPANSION[k-4]]

            for (let i = 0 ; i < prevW.length ; i+=2) {
                let wP = parseInt((prevW[i] + prevW[i+1]) , 16)
                let wUP = parseInt((prevUpW[i] + prevUpW[i+1]) , 16)
                keyExp.push((wP ^ wUP).toString(16).padStart(2 , 0))
            }

            ENCRYPTKEYEXPANSION.push(keyExp[0]+keyExp[1]+keyExp[2]+keyExp[3])
        }
        k++
    }

    /* Finally, ENCRYPTKEYEXPANSION DONE!!! */

    let temp = [...ENCRYPTKEYEXPANSION]
    ENCRYPTKEYEXPANSION = []
    k = 0

    for (let i = 0 ; i < 11 ; i++) {
        ENCRYPTKEYEXPANSION[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            ENCRYPTKEYEXPANSION[i][j] = temp[k]
            k++
        }
    }

    return ENCRYPTKEYEXPANSION
}


/* Modifying Message */

function messageBlock (message) {

    /* Making the Message as blocks */

    let newMessage = []
    message = [...message]

    if (message.length < 16) {

        newMessage[0] = [...message]
        for (let i = 0 ; i < (16 - message.length) ; i++) {
            newMessage[0].push("Z")
        }

    } else if (message.length > 16) {

        let n = Math.trunc(message.length / 16)
        let k = 0
        while (k < message.length) {
            for (let i = 0 ; i <= n ; i++) {
                newMessage[i] = []  /* Need to make an empty array at i first */
                for (let j = 0 ; j < 16 ; j++) {
                    newMessage[i][j] = message[k]
                    k++
                    if (newMessage[i][j] == undefined) {
                        newMessage[i][j] = "Z"
                    }
                }
            }
        }
    } else {
        newMessage[0] = message
    }
    
    /* Converting to HEXA */

    for (let i = 0 ; i < newMessage.length ; i++) {
        for (let j = 0 ; j < 16 ; j++) {
            newMessage[i][j] = newMessage[i][j].charCodeAt().toString(16).padStart(2 , 0)
        }
    }
    return newMessage
}


/* Extra Function for AES Encryption */

function subBytes (x) {
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            let temp = [...x[i][j]]
            if (temp[0] ==  "a" | temp[0] == "b" | temp[0] == "c" | temp[0] == "d" | temp[0] == "e" | temp[0] == "f") {
                temp[0] = parseInt(temp[0] , 16)
            } 
            if ( temp[1] == "a" | temp[1] == "b" | temp[1] == "c" | temp[1] == "d" | temp[1] == "e" | temp[1] == "f") {
                temp[1] = parseInt(temp[1] , 16)
            }
            x[i][j] = (sbox[temp[0]][temp[1]]).toString(16).padStart(2 , 0)
        }
    }
    return x
}

function shiftRows (x) {
    for (let i = 0 ; i < 4 ; i++) {
        if (i == 1) {
            let y = rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 2) {
            let y = rotWord(rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3]))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 3) {
            let y = rotWord(rotWord(rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        }               
    }
    return x
    /* It's like this becuase I used existing function rotWord() , which is structured a bit differently */
}

function GaloisField (a , b) {
    let result = 0

    while (b > 0) {
        if (b & 1) {
            result = result ^ a
        }
        let highBitSet = a & 0x80
        a = (a << 1) & 0xFF
        if (highBitSet) {
            a = a ^ 0x1b
        }
        b = b >> 1
    }
    return result
}

function mixColumns (x) {
    let temp = []
    for (let i = 0 ; i < 4 ; i++) {
        temp[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            temp[i][j] = (GaloisField(mixColumnMatrix[j][0] , parseInt(x[0][i] , 16)) ^ GaloisField(mixColumnMatrix[j][1] , parseInt(x[1][i] , 16)) ^ GaloisField(mixColumnMatrix[j][2] , parseInt(x[2][i] , 16)) ^ GaloisField(mixColumnMatrix[j][3] , parseInt(x[3][i] , 16))).toString(16).padStart(2 , 0)
        }
    }
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            x[j][i] = temp[i][j]
        }
    }
    return x
}

function addRoundKey (x , key) {
    
    /* Arranging Key */

    let keyUse = new Array([] , [] , [] , [])
    let k = l = 0
    
    for(let i = 0 ; i < 4 ; i++) {
        for(let j = 0 ; j < 4 ; j++) {
            keyUse[j][i] = key[k][l] + key[k][l+1]
            l+=2
        }
        k++
        l = 0
    }

    /* Adding Round Key */

    let temp = new Array([] , [] , [] , [])

    for(let i = 0 ; i < 4 ; i++) {
        for(let j = 0 ; j < 4 ; j++) {
            temp[i][j] = (parseInt(x[i][j] , 16) ^ parseInt(keyUse[i][j] , 16)).toString(16).padStart(2 , 0)
        }
    }
    x = [...temp]
    return x
}


/* AES Encryption Function */

function AESEncryption (fractionMessage , keyExpansion) {

    /* Making the message as 4*4 */

    let fracUpdMsg = []

    for (let i = 0 ; i < 4 ; i++) {
        fracUpdMsg[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            fracUpdMsg[i][j] = fractionMessage[j * 4 + i]
            /* Suddenly came to my mind, for AES row should be 1 4 8 12 , 2 5 9 13 , 3 6 10 14
            so as column are increasing by 4 , let j * 4. But for each i it is becoming the same
            but row is increasing by 1 , so lets add + i, it becomes j * 4 + i */
            /* It will also be useful when arranging Key for addRoundKey() */
        }
    }

    /* Iterate Rounds */

    for (let i = 0 ; i < 11 ; i++) { // One pre-round and 10 rounds for AES-128
        if (i == 0) {
            fracUpdMsg = addRoundKey(fracUpdMsg , keyExpansion[i])
        } else if (i == 10) {
            fracUpdMsg = addRoundKey(shiftRows(subBytes(fracUpdMsg)) , keyExpansion[i])
        } else {
            fracUpdMsg = addRoundKey(mixColumns(shiftRows(subBytes(fracUpdMsg))) , keyExpansion[i])
        }
    }
    /* Got the final Encryption */
    return fracUpdMsg
    /* instead of fracUpdMsg i wrote fractionMessage, and all AES came crashing down 🙂 */
}

/* Extra function of RSA Algorithm */

function extendedEuclidean (phi , e) {
    let r1 = phi
    let r2 = e
    let t1 = BigInt(0)
    let t2 = BigInt(1)

    while (r2 > 0) {
        let q = r1 / r2
        let r = r1 - (q * r2)
        r1 = r2
        r2 = r
        let t = t1 - (q * t2)
        t1 = t2
        t2 = t
    }

    if (r1 == BigInt(1)) {
        if (t1 < BigInt(0)) {
            return t1 + phi
        } else {
            return t1 // wrapping unnecessary if t1 is positive
        }
    }
}

function modularExponen(base , power , mod) {
    if (power == BigInt(1)) {
        return base % mod // We are starting from 1 and using the result to upper calls
    } else if (power == BigInt(0)) {
        return 1 // Stoping recursion, same as return True in py
    }

    if (power % BigInt(2) == 0) {
        power = power / BigInt(2) // bigint actually gives the q, not decimal parts like int
        call = modularExponen(base , power , mod) // 2^4 can called as 2^2 * 2 ^2
        result = call * call % mod // no need to call same function repeatedly, it increases work
    } else {
        result = modularExponen(base , power - BigInt(1) , mod) * modularExponen(base , BigInt(1) , mod) % mod
    }
    return result
}


/* ToDecrypted Message Process Function */

function decProc(x) {
    x = [...x]
    let temp = []
    let n = Math.trunc(Math.trunc(x.length / 2) / 16) // This is because x have 6 , 9 and such. We need 69 , 86 such. So we have to half the total length and then divide it with 16
    k = 0
    for (let i = 0 ; i < n ; i++) {
        temp.push([])
        for (let j = 0 ; j < 16 ; j++) {
            temp[i].push(x[k] + x[k+1])
            k+=2
        }
    }
    return temp
}


/* Extra Function for AES Decryption */

function rotRightWord(x) {
    x = [...x]
    let temp = []
    
    for (let i = x.length - 1 ; i >= 2 ; i-=2) {
        temp[0] = x[i]
        temp[1] = x[i-1]
        x[i] = x[i-2]
        x[i-1] = x[i-3]
        x[i-2] = temp[0]
        x[i-3] = temp[1]
    }
    return x
    /* So the left shift, first position goes to last, for right shift, last position goes to first. That's why we started from last here */
}

function InvsubBytes (x) {
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            let temp = [...x[i][j]]
            if (temp[0] ==  "a" | temp[0] == "b" | temp[0] == "c" | temp[0] == "d" | temp[0] == "e" | temp[0] == "f") {
                temp[0] = parseInt(temp[0] , 16)
            } 
            if ( temp[1] == "a" | temp[1] == "b" | temp[1] == "c" | temp[1] == "d" | temp[1] == "e" | temp[1] == "f") {
                temp[1] = parseInt(temp[1] , 16)
            }
            x[i][j] = (invSbox[temp[0]][temp[1]]).toString(16).padStart(2 , 0)
        }
    }
    return x
}

function InvshiftRows (x) {
    for (let i = 0 ; i < 4 ; i++) {
        if (i == 1) {
            let y = rotRightWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 2) {
            let y = rotRightWord(rotRightWord(x[i][0] + x[i][1] + x[i][2] + x[i][3]))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 3) {
            let y = rotRightWord(rotRightWord(rotRightWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        }               
    }
    return x
}

function InvmixColumns (x) {
    let temp = []
    for (let i = 0 ; i < 4 ; i++) {
        temp[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            temp[i][j] = (GaloisField(invMixColumnMatrix[j][0] , parseInt(x[0][i] , 16)) ^ GaloisField(invMixColumnMatrix[j][1] , parseInt(x[1][i] , 16)) ^ GaloisField(invMixColumnMatrix[j][2] , parseInt(x[2][i] , 16)) ^ GaloisField(invMixColumnMatrix[j][3] , parseInt(x[3][i] , 16))).toString(16).padStart(2 , 0)
        }
    }
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            x[j][i] = temp[i][j]
        }
    }
    return x
}


/* AES Decryption Function */

function AESDecryption (decfractionMessage , deckeyExpansion) {

    /* Making the message as 4*4 */

    let decfracUpdMsg = []

    for (let i = 0 ; i < 4 ; i++) {
        decfracUpdMsg[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            decfracUpdMsg[i][j] = decfractionMessage[j * 4 + i]
        }
    }

    /* Iterate Rounds */

    for (let i = 10 ; i >= 0 ; i--) { // One pre-round and 10 rounds for AES-128
        if (i == 10) {
            decfracUpdMsg = addRoundKey(decfracUpdMsg , deckeyExpansion[i])
        } else if (i == 0) {
            decfracUpdMsg = addRoundKey(InvsubBytes(InvshiftRows(decfracUpdMsg)) , deckeyExpansion[i])
        } else {
            decfracUpdMsg = InvmixColumns(addRoundKey(InvsubBytes(InvshiftRows(decfracUpdMsg)) , deckeyExpansion[i])) // Not reversing the process of encryption, reversing the encryption steps!!! Such as changing then shifting becomes shifting then changing, else it wont be same
        }
    }

    /* Got the final Decryption */
    return decfracUpdMsg
}

                                    /* Main() */


/* Generating Public and Private Key */

const p = primeHex[Math.floor(Math.random() * primeHex.length)]
const q = primeHex[Math.floor(Math.random() * primeHex.length)]
const n = BigInt(p) * BigInt(q)
let phiOfn = (BigInt(p) - BigInt(1)) * (BigInt(q) - BigInt(1)) // Need Bigint because JS cant work with both bigint and int
const e = BigInt(65537) // Usually used in RSA
const d = extendedEuclidean(phiOfn , e) // We are already wrapping the negative modulus , so need extra mod phiofn

pubshow.textContent += e
privshow.textContent += d

/* AES Encryption and RSA Key Generation */

encBtn.onclick = () => {

    /* Checking if input is not null */

    if (encMsg.value && pubKey.value) {
        const encryptMessage = encMsg.value
        const publicKey = BigInt(pubKey.value)

        let AESKEY = []
        let ENCRYPTKEYEXPANSION = []
        let UPDATEDHEXAMESSAGE = []
        let encryptedMessage = ""             

        /* Key generation */

        AESKEY = AESKeyGenerate(AESKEY)
        ENCRYPTKEYEXPANSION = keyExpansion(AESKEY , ENCRYPTKEYEXPANSION)

        /* Message Processing */

        UPDATEDHEXAMESSAGE = messageBlock(encryptMessage)

        /* AES Encryption */

        for (let i = 0 ; i < UPDATEDHEXAMESSAGE.length ; i++) {
            let temp = []
            temp = AESEncryption(UPDATEDHEXAMESSAGE[i] , ENCRYPTKEYEXPANSION)

            for (let j = 0 ; j < 4 ; j++) {
                for (let k = 0 ; k < 4 ; k++) {
                    encryptedMessage += temp[k][j]
                }
            }
        }

        /* Encrypted Message Show */
        
        encMsgShow.textContent = encryptedMessage

        /* Encrypting AES Key with RSA */

        let RSAENCKEY = BigInt("0x" + AESKEY.join(""))
        RSAENCKEY = modularExponen(RSAENCKEY , publicKey , n)

        encryptedKey.textContent = RSAENCKEY
    } else {
        window.alert("Enter Your Message and Public Key and Then Try Again!")
    }
}


/* RSA Key decryption and AES decryption */

decBtn.onclick = () => {
    if (decMsg.value && encSymKey.value && privKey.value) {

        let RSADECKEY = BigInt(encSymKey.value)
        const privateKey = BigInt(privKey.value)
        let AESDECKEY = []
        let toDecryptMessage = decMsg.value
        let DECEXPANSIONAES = []
        let UPDATEDTODECMESSAGE = []
        let decryptedMessage = ""

        /* Decryptng AES Key using RSA */

        RSADECKEY = modularExponen(RSADECKEY , privateKey , n).toString(16)
        RSADECKEY = [...RSADECKEY]

        for (let i = 0 ; i < RSADECKEY.length ; i+=2) {
            AESDECKEY.push(RSADECKEY[i] + RSADECKEY[i+1])
        }

        /* Decrypted Expanded AES Key */

        DECEXPANSIONAES = keyExpansion(AESDECKEY , DECEXPANSIONAES)

        /* ToDecrypt Message Process */

        UPDATEDTODECMESSAGE = decProc(toDecryptMessage)

        /* AES Decryption */

        for (let i = 0 ; i < UPDATEDTODECMESSAGE.length ; i++) {
            let temp = []
            temp = AESDecryption(UPDATEDTODECMESSAGE[i] , DECEXPANSIONAES)
            
            for (let j = 0 ; j < 4 ; j++) {
                for (let k = 0 ; k < 4 ; k++) {
                    decryptedMessage += String.fromCharCode(parseInt(temp[k][j] , 16))
                }
            }
        }

        decryptedMessage = decryptedMessage.replaceAll("Z" , "")

        decMsgShow.textContent = decryptedMessage

    } else {
        window.alert("Enter Your Encrypted Message, Encrypted Symmetric Key and Private Key and Then Try Again!")
    }
}