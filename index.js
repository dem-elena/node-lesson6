import {readFile,writeFile,readdir,stat,mkdir,copyFile} from 'node:fs/promises'


const readDirNew=async (sourceDir,targetDir)=>{
     
    try {
        await dirCreate(targetDir)
        const dataFiles=await readdir(sourceDir)
        
        dataFiles.forEach(async(fileName)=>{
            const path2=(sourceDir+'/'+fileName)
            const statFile=await stat(path2)
            if (statFile.isDirectory()){
                await readDirNew(path2,`${targetDir}/${fileName}`)
            }
            else {
                await copyFile(path2,`${targetDir}/${fileName}`)
            }
        })
        return null
        
    }
    catch (error) {
        console.error(error,"Возникла ошибка при чтении файла")
        return error
    }
    
}

// // чтение файла
// // readFile('./First/1.txt','utf8',(err,data)=>{
// //     if (err) throw console.log(err,"Возникла ошибка при чтении файла")
// //     console.log(data)
// // })
const dirCreate=async (nameDir)=>{
    try{
        const newDir=await mkdir(nameDir,{recursive: true})
    }
    catch (error){
        console.error(error)
        
    }
    
}
const rezultCall=(rez)=>{
    console.log(rez)
}

const app = async (sourceDir,targetDir,callBack)=> {      
    callBack(await readDirNew(sourceDir,targetDir))
}
app('./First',"./Sec",rezultCall)
