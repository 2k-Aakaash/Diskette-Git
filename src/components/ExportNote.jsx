// src/components/ExportNote.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { saveAs } from 'file-saver';
import { marked } from 'marked';
import { PDFDownloadLink, Page, Text, View, Document as PDFDocument, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        margin: 5,
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    code: {
        fontFamily: 'Courier',
        backgroundColor: '#f5f5f5',
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
    link: {
        color: 'blue',
        textDecoration: 'underline',
    },
    list: {
        marginLeft: 15,
    },
    listItem: {
        marginBottom: 5,
    },
});

const renderMarkdown = (text) => {
    const tokens = marked.lexer(text);
    return tokens.map((token, index) => {
        switch (token.type) {
            case 'heading':
                return (
                    <Text
                        key={index}
                        style={[styles.text, { fontSize: 24 - token.depth * 2, fontWeight: 'bold', marginBottom: 10 }]}
                    >
                        {token.text}
                    </Text>
                );
            case 'paragraph':
                return (
                    <Text key={index} style={styles.text}>
                        {token.text}
                    </Text>
                );
            case 'strong':
                return (
                    <Text key={index} style={styles.bold}>
                        {token.text}
                    </Text>
                );
            case 'em':
                return (
                    <Text key={index} style={styles.italic}>
                        {token.text}
                    </Text>
                );
            case 'codespan':
                return (
                    <Text key={index} style={styles.code}>
                        {token.text}
                    </Text>
                );
            case 'link':
                return (
                    <Text key={index} style={styles.link}>
                        {token.text}
                    </Text>
                );
            case 'list':
                return (
                    <View key={index} style={styles.list}>
                        {token.items.map((item, i) => (
                            <Text key={i} style={[styles.text, styles.listItem]}>
                                • {item.text}
                            </Text>
                        ))}
                    </View>
                );
            default:
                return <Text key={index} style={styles.text}>{token.text}</Text>;
        }
    });
};

const PDFContent = ({ note }) => (
    <PDFDocument>
        <Page style={styles.page}>
            <Text style={styles.title}>{note.title}</Text>
            {renderMarkdown(note.content)}
        </Page>
    </PDFDocument>
);

const ExportNote = ({ open, onClose, note }) => {
    const [format, setFormat] = useState('pdf');

    const handleExport = async () => {
        if (format === 'pdf') {
            // PDF export handled by PDFDownloadLink component
        } else if (format === 'docx') {
            const blob = new Blob([`# ${note.title}\n\n${note.content}`], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
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
                        <MenuItem value="md">Markdown (.md)</MenuItem>
                        <MenuItem value="txt">Text (.txt)</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleExport} color="primary">Export</Button>
                {format === 'pdf' && (
                    <PDFDownloadLink document={<PDFContent note={note} />} fileName={`${note.title}.pdf`}>
                        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                    </PDFDownloadLink>
                )}
            </DialogActions>
        </Dialog>
    );
};


export default ExportNote;
