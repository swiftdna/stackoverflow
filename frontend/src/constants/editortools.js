import axios from 'axios'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
import ImageTool from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    // ...Image,
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file){
          // your own uploading logic here
          const formData = new FormData()
          formData.append('file', file)
          formData.append('cloud_name', 'dac0hzhv5')
          formData.append('upload_preset', 'j8gp4zov')

          return axios.post(
            'https://api.cloudinary.com/v1_1/dac0hzhv5/image/upload',
            formData
          ).then((res) => {
            const {data: {secure_url}} = res;

            return {
              success: 1,
              file: {
                url: secure_url,
                // any other image data you want to store, such as width, height, color, extension, etc
              }
            };
          });
        }
      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
