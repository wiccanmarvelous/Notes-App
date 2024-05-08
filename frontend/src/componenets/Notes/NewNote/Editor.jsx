import React, { useState } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import MenuBar, { extensions } from './MenuBar';
import EditorContent from './Menus'

const Editor = (props) => {
    const [showMenuBar, setShowMenuBar] = useState(false);
    const { editor } = useCurrentEditor();

    const handleSelectionChange = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        setShowMenuBar(selectedText.length > 0);

        if (!selectedText) {
            if (editor) {
                editor.commands.clearFormatting();
            }
        }
    };

    const handleContentChange = (newContent) => {
        props?.setContent(newContent);
    };

    return (
        <div className="editor" onClick={() => props?.handleClick(false)}>
            <EditorProvider
                extensions={extensions}
                slotBefore={props.haveMenuBar ? <MenuBar /> : ''}
                content={props.content}
                onUpdate={({ editor }) => handleContentChange(editor.getHTML())}
                onSelectionUpdate={handleSelectionChange}
            >
            </EditorProvider>
        </div>
    );
};

export default Editor;
