const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Fichier d'entrée principal
  output: {
    path: path.resolve(__dirname, 'dist'),  // Dossier où Webpack va stocker le bundle
    filename: 'bundle.js',                  // Nom du fichier de sortie
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Extensions des fichiers que Webpack doit gérer
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,     // Transpiler les fichiers TypeScript
        exclude: /node_modules/,
        use: 'babel-loader',     // Utilise Babel pour la transpilation
      },
      {
        test: /\.css$/,          // Gérer les fichiers CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,  // Gérer les fichiers d'images
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',  // Générer des sourcemaps pour faciliter le débogage
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  mode: 'development',    // Définit le mode de Webpack
};
