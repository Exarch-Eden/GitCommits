import React, { FC } from 'react'

import "../styles/FileContent.css"

interface FileContentProps {

}

const FileContent: FC<FileContentProps> = () => {
  return (
    <div className="fileContentContainer">
      <p>This is the file content.</p>
    </div>
  )
}

export default FileContent
