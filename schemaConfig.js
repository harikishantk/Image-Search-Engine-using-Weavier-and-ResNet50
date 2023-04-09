const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw', 
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob'],
        },
        {
            'name': 'text',
            'dataType': ['string'],
        }
    ]
};

export default schemaConfig;

// hnsw meaning hierarchical navigable small world graph 
// It is a graph-based approximate nearest neighbor algorithm, 
// which is used to find points in a multi-dimensional space that are nearest to a given query point.
// TIme complexity: O(log(N))
// Space complexity: O(N)
