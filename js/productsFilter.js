  document.querySelector('.apply-button').addEventListener('click', function () {

            const categoryFilters = document.querySelectorAll('.filter-category input[type="checkbox"]');
            const sizeFilters = document.querySelectorAll('.filter-size input[type="checkbox"]');
            const finishFilters = document.querySelectorAll('.filter-finish input[type="checkbox"]');


            const selectedCategories = Array.from(categoryFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.nextSibling.textContent.trim());
            const selectedSizes = Array.from(sizeFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.nextSibling.textContent.trim());
            const selectedFinishes = Array.from(finishFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.nextSibling.textContent.trim());


            const tiles = document.querySelectorAll('.tile');
            let anyTileVisible = false;

            tiles.forEach(tile => {
                const tileCategory = tile.querySelector('.pd_name').textContent;
                const tileSize = tile.querySelector('p:nth-child(3)').textContent;
                const tileFinish = tile.querySelector('p:nth-child(4)').textContent;


                const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tileCategory);
                const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(tileSize);
                const matchesFinish = selectedFinishes.length === 0 || selectedFinishes.includes(tileFinish);


                if (matchesCategory && matchesSize && matchesFinish) {
                    tile.style.display = '';
                    anyTileVisible = true;
                } else {
                    tile.style.display = 'none';
                }
            });


            if (!anyTileVisible) {
                showMessage('Sorry, Configuration not found');
            } else {
                hideMessage();
            }
        });

        function showMessage(message) {

            const messageElement = document.querySelector('.no-results-message');
            const messageText = document.getElementById('noResultsText');

            messageText.textContent = message;

            messageElement.style.display = 'block';
        }

        function hideMessage() {

            const messageElement = document.querySelector('.no-results-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }
