function renderProductList(data,card_container,originalCard,url_prefix,target="_self"){const result=data.result;if(result){const products=result;if(products){products.forEach((product)=>{var duplicatedCard=originalCard.cloneNode(true);if(duplicatedCard.querySelector(".gs-product-title")){duplicatedCard.querySelector(".gs-product-title").textContent=product.title;}
if(duplicatedCard.querySelector(".gs-product-image")){duplicatedCard.querySelector(".gs-product-image").src=product.front_image_full_path;}
if(duplicatedCard.querySelector(".gs-price-discount-percent")){if(parseInt(product.discount_percent)>0){duplicatedCard.querySelector(".gs-price-discount-percent-number").textContent=product.discount_percent+"%";}else{duplicatedCard.querySelector(".gs-price-discount-percent").style.display="none";}}
if(duplicatedCard.querySelector(".gs-price")){if(parseInt(product.price_discount)>0){duplicatedCard.querySelector(".gs-price").textContent=Intl.NumberFormat().format(product.price_discount)+
product.Currency.sign;if(duplicatedCard.querySelector(".gs-price-old")){duplicatedCard.querySelector(".gs-price-old").textContent=Intl.NumberFormat().format(product.price)+
product.Currency.sign;}}else{duplicatedCard.querySelector(".gs-price").textContent=Intl.NumberFormat().format(product.price)+product.Currency.sign;if(duplicatedCard.querySelector(".gs-price-old")){duplicatedCard.querySelector(".gs-price-old").style.display="none";}}}
if(duplicatedCard.querySelector(".gs-product-brand-logo")){var brandLogo=product.ModuleCategories?.find(function(category){return category.is_brand=="1";});if(brandLogo&&brandLogo.brand_image){duplicatedCard.querySelector(".gs-product-brand-logo img").src=`https://cdn.greensoft.mn/uploads/site/${site_id}/category/${brandLogo.brand_image}`;}else{duplicatedCard.querySelector(".gs-product-brand-logo").style.display="none";}}
if(duplicatedCard.querySelector(".gs-product-link")){duplicatedCard.querySelectorAll(".gs-product-link").forEach(function(link){link.href=url_prefix+product.id;link.target=target;});}
card_container.appendChild(duplicatedCard);});}}}
function closestParentWithClass(element,className){let currentElement=element;while(currentElement&&!currentElement.classList.contains(className)){currentElement=currentElement.parentElement;}
return currentElement;}
document.addEventListener("DOMContentLoaded",async function(){var sections=document.querySelectorAll(".gs-product-card-list");var api_base_url="https://api.greensoft.mn/api.php/product/getlist?site_id="+site_id;sections.forEach(function(section){section.querySelectorAll(".gs-card-container").forEach(function(card_container){var originalCard=card_container.querySelector(".gs-product-item-card");var swiperContainerId="";var makeSwiperFunctionName="";if(originalCard.classList.contains("swiper-slide")){var swiperContainer=closestParentWithClass(originalCard,"swiper");swiperContainerId=swiperContainer.id;makeSwiperFunctionName=swiperContainer.dataset.functionname;}
card_container.innerHTML="";var api_url=api_base_url+"&"+card_container.dataset.params;var url_prefix=card_container.dataset.urlprefix;var target=card_container.dataset.target||"_self";fetch(api_url).then(function(response){return response.json();}).then(function(data){const result=data.result;if(result)
renderProductList(data,card_container,originalCard,url_prefix,target);}).then(function(e){console.log(e);console.log(swiperContainerId,makeSwiperFunctionName);if(swiperContainerId&&makeSwiperFunctionName){window[makeSwiperFunctionName](swiperContainerId);}});});});});