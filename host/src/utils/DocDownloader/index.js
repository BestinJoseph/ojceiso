import React from 'react'
import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer'

const DocDownloader = ({ name }) => {
    const styles = {
        page: {}
    }

    // console.log(name)

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Name: {name}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

export default DocDownloader
