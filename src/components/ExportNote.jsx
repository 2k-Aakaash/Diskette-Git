// src/components/ExportNote.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import { marked } from 'marked';
import html2canvas from 'html2canvas';

const ExportNote = ({ open, onClose, note }) => {
    const [format, setFormat] = React.useState('pdf');

    const handleExport = async () => {
        if (format === 'pdf') {
            const doc = new jsPDF();
            const markdownContent = marked(note.content);
            const contentContainer = document.createElement('div');
            contentContainer.innerHTML = markdownContent;
            contentContainer.style.width = '210mm'; // A4 width in mm
            contentContainer.style.padding = '20px';

            document.body.appendChild(contentContainer);

            await html2canvas(contentContainer, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            });

            document.body.removeChild(contentContainer);
            doc.save(`${note.title}.pdf`);
        } else if (format === 'docx') {
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({ text: note.title, heading: "Heading1" }),
                            new Paragraph({ text: note.content }),
                        ],
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `${note.title}.docx`);
        } else if (format === 'md') {
            const blob = new Blob([`# ${note.title}\n\n${note.content}`], { type: 'text/markdown;charset=utf-8' });
            saveAs(blob, `${note.title}.md`);
        } else if (format === 'txt') {
            const blob = new Blob([`${note.title}\n\n${note.content}`], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, `${note.title}.txt`);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Export Note</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Format</InputLabel>
                    <Select value={format} onChange={(e) => setFormat(e.target.value)}>
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="docx">DOCX</MenuItem>
                        <MenuItem value="md">Markdown</MenuItem>
                        <MenuItem value="txt">Text</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleExport} color="primary">Export</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportNote;
