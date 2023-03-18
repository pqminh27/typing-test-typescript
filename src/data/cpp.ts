import {Repo} from "."

export const cppRepo: Repo = {
    label: "C++",
    url: "https://refactoring.guru/design-patterns/cpp/example",
    files: [
        {
            path: "",
            code: `
XERCES_CPP_NAMESPACE_USE
void DoOutput2Stream(DOMDocument* pmyDOMDocument);
void DoOutput2File(DOMDocument* pmyDOMDocument, const wchar_t * FullFilePath );
int main()
{
    XMLPlatformUtils::Initialize();
    DOMImplementation* p_DOMImplementation = NULL;
    p_DOMImplementation = DOMImplementationRegistry::getDOMImplementation(XMLString::transcode("core"));
    DOMDocument* p_DOMDocument = NULL;
    p_DOMDocument = p_DOMImplementation->createDocument(0, L"Hello_World", 0);
    DOMElement* p_RootElement = NULL;
    p_RootElement = p_DOMDocument->getDocumentElement();
    DOMComment* p_DOMComment = NULL;
    p_DOMComment = p_DOMDocument->createComment(L"Dates are formatted mm/dd/yy." 
        L" Don't forget XML is case-sensitive.");
    p_RootElement->appendChild(p_DOMComment);
    DOMElement* p_DataElement = NULL;
    p_DataElement = p_DOMDocument->createElement(L"data");
    wchar_t wcharBuffer[128];
    _wstrdate_s(wcharBuffer, 9);
    p_DataElement->setAttribute(L"date", wcharBuffer);
    _itow_s(65536, wcharBuffer, 128, 10);
    p_DataElement->setAttribute(L"integer", wcharBuffer);
    std::wstringstream myStream;
    myStream.precision(8);
    myStream.setf(std::ios_base::fixed, std::ios_base::floatfield);
    myStream << 3.1415926535897932384626433832795;
    const std::wstring ws(myStream.str());
    p_DataElement->setAttribute(L"float", ws.c_str());
    p_RootElement->appendChild(p_DataElement);
    DOMElement* p_Row = NULL;
    p_Row = p_DOMDocument->createElement(L"row");
    _itow_s(1, wcharBuffer, 128, 10);
    p_Row->setAttribute(L"index", wcharBuffer);
    DOMText* p_TextNode = NULL;
    p_TextNode = p_DOMDocument->createTextNode(L"Comments and" 
        L" data can also go in text nodes.");
    p_Row->appendChild(p_TextNode);
    p_DataElement->appendChild(p_Row);
    p_Row = p_DOMDocument->createElement(L"row");
    p_Row->setAttribute(L"description", L"The value of PI");
    p_TextNode = p_DOMDocument->createTextNode(L"3.1415926535897932384626433832795");
    p_Row->appendChild(p_TextNode);
    p_DataElement->appendChild(p_Row);
    p_Row = p_DOMDocument->createElement(L"row");
    p_Row->setAttribute(L"website", L"http://www.3g4g.co.uk/");
    p_TextNode = p_DOMDocument->createTextNode(L"3G and 4G Wireless Resources");
    p_Row->appendChild(p_TextNode);
    p_DataElement->appendChild(p_Row);
    DoOutput2Stream(p_DOMDocument);
    DoOutput2File(p_DOMDocument, XMLString::transcode("..\\..\\XML\\Test.xml"));
    p_DOMDocument->release();
    XMLPlatformUtils::Terminate();
    return 0;
} 
void DoOutput2Stream(DOMDocument* pmyDOMDocument)
{
    DOMImplementation* pImplement = NULL;
    DOMLSSerializer* pSerializer = NULL;
    XMLFormatTarget* pTarget = NULL;
    pImplement = DOMImplementationRegistry::getDOMImplementation(L"LS");
    pSerializer = ((DOMImplementationLS*)pImplement)->createLSSerializer();
    pSerializer->setNewLine(XMLString::transcode("\n"));
    DOMConfiguration* pDomConfiguration = pSerializer->getDomConfig();
    pDomConfiguration->setParameter(XMLUni::fgDOMWRTFormatPrettyPrint, true);
    pTarget = new StdOutFormatTarget();
    DOMLSOutput* pDomLsOutput = ((DOMImplementationLS*)pImplement)->createLSOutput();
    pDomLsOutput->setByteStream(pTarget);
    pSerializer->write(pmyDOMDocument, pDomLsOutput);
}
void DoOutput2File(DOMDocument* pmyDOMDocument, const wchar_t* FullFilePath )
{
    DOMImplementation* pImplement = NULL;
    DOMLSSerializer* pSerializer = NULL;
    XMLFormatTarget* pTarget = NULL;
    pImplement = DOMImplementationRegistry::getDOMImplementation(L"LS");
    pSerializer = ((DOMImplementationLS*)pImplement)->createLSSerializer();
    DOMConfiguration* pDomConfiguration = pSerializer->getDomConfig();
    pDomConfiguration->setParameter(XMLUni::fgDOMWRTFormatPrettyPrint, true);
    pTarget = new LocalFileFormatTarget(FullFilePath);
    DOMLSOutput* pDomLsOutput = ((DOMImplementationLS*)pImplement)->createLSOutput();
    pDomLsOutput->setByteStream(pTarget);
    pSerializer->write(pmyDOMDocument, pDomLsOutput);
}
`,
        },
        {
            path: "",
            code: `                          
class Builder{
public:
    virtual ~Builder(){}
    virtual void ProducePartA() const =0;
    virtual void ProducePartB() const =0;
    virtual void ProducePartC() const =0;
};
class ConcreteBuilder1 : public Builder{
private:
    Product1* product;
public:
    ConcreteBuilder1(){
        this->Reset();
    }
    ~ConcreteBuilder1(){
        delete product;
    }
    void Reset(){
        this->product= new Product1();
    }
    void ProducePartA()const override{
        this->product->parts_.push_back("PartA1");
    }
    void ProducePartB()const override{
        this->product->parts_.push_back("PartB1");
    }
    void ProducePartC()const override{
        this->product->parts_.push_back("PartC1");
    }
    Product1* GetProduct() {
        Product1* result= this->product;
        this->Reset();
        return result;
    }
};
class Director{
private:
    Builder* builder;
public:
    void set_builder(Builder* builder){
        this->builder=builder;
    }
    void BuildMinimalViableProduct(){
        this->builder->ProducePartA();
    }
    void BuildFullFeaturedProduct(){
        this->builder->ProducePartA();
        this->builder->ProducePartB();
        this->builder->ProducePartC();
    }
};
void ClientCode(Director& director)
{
    ConcreteBuilder1* builder = new ConcreteBuilder1();
    director.set_builder(builder);
    std::cout << "Standard basic product:\n"; 
    director.BuildMinimalViableProduct();
    Product1* p= builder->GetProduct();
    p->ListParts();
    delete p;
    std::cout << "Standard full featured product:\n"; 
    director.BuildFullFeaturedProduct();
    p= builder->GetProduct();
    p->ListParts();
    delete p;
    std::cout << "Custom product:\n";
    builder->ProducePartA();
    builder->ProducePartC();
    p=builder->GetProduct();
    p->ListParts();
    delete p;
    delete builder;
}
int main(){
    Director* director= new Director();
    ClientCode(*director);
    delete director;
    return 0;    
}
`,
        },
        {
            path: "",
            code: `
DomReader::DomReader()
{
    XMLPlatformUtils::Initialize();
    domFileParser = new XercesDOMParser;
    domFileParser->setValidationScheme(XercesDOMParser::Val_Never);
    domFileParser->setDoNamespaces(false);  
}
DomReader::~DomReader()
{
    if(domFileParser) delete domFileParser;
    XMLPlatformUtils::Terminate();
}
void DomReader::readDomFile(string& domFileName) throw(std::runtime_error)
{
    struct _stat fileStatus;
    int returnStat = _stat(domFileName.c_str(), &fileStatus);
    if(returnStat == ENOENT) throw (runtime_error("Path file_name does not exist, or path is an empty string."));
    else if(returnStat == ENOTDIR) throw (std::runtime_error("A component of the path is not a directory."));
    else if(returnStat == ELOOP) throw (std::runtime_error("Too many symbolic links encountered while traversing the path."));
    else if(returnStat == EACCES) throw (std::runtime_error("Permission denied."));
    else if(returnStat == ENAMETOOLONG) throw (std::runtime_error("File can not be read\n"));
    else if(returnStat == -1) throw (std::runtime_error("Other Unknown Error\n"));
    domFileParser->parse(domFileName.c_str());
    DOMDocument* xmlDoc = domFileParser->getDocument();
    if(!xmlDoc) throw(std::runtime_error("DOM document could not be opened"));
    DOMElement* elementRoot = xmlDoc->getDocumentElement();
    if(!elementRoot) throw(std::runtime_error("empty XML document"));
    string xmlString;
    try
    {
        convertDomToXmlString(elementRoot, xmlString);
    }
    catch(runtime_error e)
    {
        throw(runtime_error(e));
    }
    cout << "DOM File: "<< domFileName << " output is as follows " << endl;
    cout << xmlString;
    cout << endl;
}
void DomReader::convertDomToXmlString(DOMNode* domNode, string &xmlString) throw(std::runtime_error)
{
    try
    {
        DOMImplementation* domImpl = DOMImplementationRegistry::getDOMImplementation(L"LS");
        DOMLSSerializer* domSerializer = ((DOMImplementationLS*)domImpl)->createLSSerializer();
        XMLCh* xmlBuffer = domSerializer->writeToString(domNode);
        xmlString = narrow(xmlBuffer);
        XMLString::release (&xmlBuffer);
        delete domSerializer;
    }
    catch(XMLException& e)
    {
        char* xmlErrMessage = XMLString::transcode(e.getMessage());
        throw runtime_error(xmlErrMessage);
    }
    catch(...)
    {
        throw runtime_error("Unknown error in convertDomToXmlString\n");
    }
}
string DomReader::narrow(const wstring& str)
{
    ostringstream stm ;    
    const ctype<char>& ctfacet = use_facet<ctype<char>>(stm.getloc()) ;    
    for(size_t i = 0; i < str.size(); ++i)
        stm << ctfacet.narrow(str[i], 0);    
    return stm.str();
}            
`,
        },
        {
            path: "",
            code: `
int main(int argc, char** argv) {
    srand(time(0));
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH);
    glutInitWindowSize(winw, winh);											
    glutInitWindowPosition((glutGet(GLUT_SCREEN_WIDTH)-winw)/2, (glutGet(GLUT_SCREEN_HEIGHT)-winh)/2);
	main_window = glutCreateWindow("Bouncing Balls Animation");
    initRendering();											
    makeBalls();
    glutDisplayFunc(drawScene);
    glutTimerFunc(_time, update, 0);
	GLUI_Master.set_glutKeyboardFunc(handleKeypress);
	GLUI_Master.set_glutSpecialFunc(handleSpecialKeypress);
	GLUI_Master.set_glutMouseFunc(MouseButton);
	glutMotionFunc(MouseMotion);
	glutPassiveMotionFunc(MousePassiveMotion);
	GLUI_Master.set_glutReshapeFunc(handleResize);
	glui = GLUI_Master.create_glui_subwindow(main_window, GLUI_SUBWINDOW_RIGHT);
	obj_panel = new GLUI_Panel(glui, "Ball Properties" );
    new GLUI_StaticText(obj_panel,"");
	new GLUI_Button(obj_panel, "Play/Pause", 0, cbForPP);
	new GLUI_Separator(obj_panel);
	(new GLUI_Spinner( obj_panel, "Number of Balls:", &num_balls))->set_int_limits(1, max_balls);
    new GLUI_StaticText(obj_panel, "Change Speed of Balls: ");
	(new GLUI_Scrollbar(obj_panel, "Speed",GLUI_SCROLL_HORIZONTAL, &speed, 1, cbSpeed))->set_int_limits(1, 10);
	new GLUI_StaticText(obj_panel, "");		
    new GLUI_Checkbox(obj_panel, "Same Size of Balls", &same_size, 1, cbSameSize);
    new GLUI_StaticText(obj_panel, "");
    new GLUI_Checkbox(obj_panel, "Change Color of Balls", &same_color, 1, cbSameColor);
    new GLUI_StaticText(obj_panel, "");  
    gb = new GLUI_Button(obj_panel, "Choose Color", 0,(GLUI_Update_CB)cbColorChooser);
    gb->disable();
    new GLUI_Separator(obj_panel);
    new GLUI_StaticText(obj_panel, "Red, Green, Blue :");
    sbRed = new GLUI_Scrollbar(obj_panel, "Red", GLUI_SCROLL_HORIZONTAL, &globalR, 1, cbSameColor);
    sbRed->set_float_limits(1, 256);
    sbGreen = new GLUI_Scrollbar(obj_panel, "Green", GLUI_SCROLL_HORIZONTAL, &globalG, 1, cbSameColor);
    sbGreen->set_float_limits(1, 256);
    sbBlue = new GLUI_Scrollbar(obj_panel, "Blue", GLUI_SCROLL_HORIZONTAL, &globalB, 1, cbSameColor);
    sbBlue->set_float_limits(1, 256);
    sbRed->disable();
	sbGreen->disable();
    sbBlue->disable();	
	new GLUI_Separator(glui);
	obj_panel = new GLUI_Rollout(glui, "Look And Feel", false);
    radio2D = new GLUI_RadioGroup(obj_panel, &thm_int, 1, cbTheme);
    new GLUI_RadioButton(radio2D, "Default");
    new GLUI_RadioButton(radio2D, "Black Metallic");
	new GLUI_RadioButton(radio2D, "High Contrast");
    new GLUI_RadioButton(radio2D, "Pool/Billiard"); 
	new GLUI_StaticText(obj_panel, "");
    radio3D = new GLUI_RadioGroup(obj_panel, &thm_int, 1, cbTheme);
    new GLUI_RadioButton(radio3D, "Default");
    new GLUI_RadioButton(radio3D, "Black Metallic");
    new GLUI_RadioButton(radio3D, "High Contrast");
    new GLUI_RadioButton(radio3D, "Pool/Billiard"); 
    new GLUI_StaticText(obj_panel, "");
    radio3D->disable();
	new GLUI_Separator(glui);
	obj_panel = new GLUI_Panel(glui, "Mode");
	radio = new GLUI_RadioGroup(obj_panel, &threeD, 1, cbMode);
    new GLUI_RadioButton(radio, "2D");
	new GLUI_RadioButton(radio, "3D");
	new GLUI_Separator(glui);
	gb_enable = new GLUI_Button(glui, "Disable movement", DISABLE_ID, control_cb);
	gb_disable = new GLUI_Button(glui, "Enable movement", ENABLE_ID, control_cb);
	gb_enable->disable();
	gb_disable->disable();
    new GLUI_StaticText(glui, ""); 
	new GLUI_Separator(glui);
    new GLUI_Button(glui, "Quit", 0, (GLUI_Update_CB)exit);
	glui2 = GLUI_Master.create_glui_subwindow(main_window, GLUI_SUBWINDOW_BOTTOM);
    glui2->set_main_gfx_window(main_window);
    GLUI_Translation *trans_xy = new GLUI_Translation(glui2, "Objects XY", GLUI_TRANSLATION_XY, obj_pos);
    trans_xy->set_speed(.005);
    new GLUI_Column(glui2, false);
    GLUI_Translation *trans_x = new GLUI_Translation(glui2, "Objects X", GLUI_TRANSLATION_X, obj_pos);
    trans_x->set_speed(.005);
    new GLUI_Column( glui2, false );
    GLUI_Translation *trans_y = new GLUI_Translation(glui2, "Objects Y", GLUI_TRANSLATION_Y, &obj_pos[1]);
    trans_y->set_speed(.005);
    new GLUI_Column(glui2, false);
    GLUI_Translation *trans_z = new GLUI_Translation(glui2, "Objects Z", GLUI_TRANSLATION_Z, &obj_pos[2]);
    trans_z->set_speed(.005);
	glui->set_main_gfx_window(main_window);
	GLUI_Master.set_glutIdleFunc(myGlutIdle);
    glutMainLoop();
    return 0;
}            
`,
        },
        {
            path: "",
            code: `
class Vector
{
public:
	using Iterator = VectorIterator<Vector>;
	using value_type = _DataType;
	Vector() : v_beg(nullptr), v_end(nullptr), v_last(nullptr) {}
	Vector(unsigned l, const _DataType& other = _DataType())
	{
		v_beg = new _DataType[l];
		v_last = v_beg + l;
		v_end = v_beg + l;
		for (_DataType* i = v_beg; i < v_end; i++) {
			*i = other;
		}
	}
	template <class _Iter>
	Vector(_Iter b, _Iter e, const value_type& alloc = {})
	{
		size_t m_size = 0;
		for (_Iter it(b); it != e; ++it)
			m_size++;
		v_beg = new _DataType[m_size];
		v_end = v_beg + m_size;
		v_last = v_beg + m_size;
		_DataType* ptr = v_beg;
		for (; b != e; ++b) *(ptr++) = *b;
	};
	Vector(const std::initializer_list<_DataType>& L)
	{
		v_beg = new _DataType[L.size()];
		v_end = v_beg + L.size();
		v_last = v_beg + L.size();
		auto& tmp_ptr = v_beg;
		_DataType* pos = v_beg;
		for(auto it = L.begin(); it != L.end(); ++it) *(pos++) = *it;
	}
	Vector(const std::list<_DataType>& p_list) {
		v_beg = new _DataType[p_list.size()];
		v_end = v_beg + p_list.size();
		v_last = v_beg + p_list.size();
		auto& tmp = v_beg;
		_DataType* pos = v_beg;
		for(auto& it = p_list.begin(); it != p_list.end(); ++it) *(pos++) = *it;
		
	}
	Vector(const Vector& buffer)
	{
		v_beg = new _DataType[buffer.v_last - buffer.v_beg];
		size_t m_size = buffer.v_end - buffer.v_beg;
		size_t m_cap = buffer.v_last - buffer.v_beg;
		v_end = v_beg + m_size;
		v_last = v_beg + m_cap;
		_DataType* ptr_p = buffer.v_beg;
		_DataType* ptr = v_beg;
		for (; ptr_p < buffer.v_end; ptr_p++) *(ptr++) = *ptr_p;
	}
	Vector(Vector&& buffer) noexcept
	{
		v_beg = buffer.v_beg;
		v_end = buffer.v_end;
		v_last = buffer.v_last;
		buffer.v_beg = nullptr;
		buffer.v_end = nullptr;
		buffer.v_last = nullptr;
	}
	~Vector()
	{
		delete[] v_beg;
	}
	_DataType& operator [](int index)
	{
		return v_beg[index];
	}
	const _DataType& operator [](int index) const
	{
		return v_beg[index];
	}
	_DataType& at(int index)
	{
		if(index >= (v_end - v_beg) || index < 0) throw OutOfRangeException(index);
		return v_beg[index];
	}
	const _DataType& at(int index) const
	{
		if(index >= (v_end - v_beg) || index < 0) throw OutOfRangeException(index);
		return v_beg[index];
	}
	Iterator begin()
	{
		return Iterator(v_beg);
	};
	Iterator end()
	{
		return Iterator(v_end);
	};
	Vector& operator = (const Vector& other)
	{
		if(this == &other) return (*this);
		int capacity = other.v_last - other.v_beg;
		delete[] v_beg;
		v_beg = new _DataType[capacity];
		v_end = v_beg + (other.v_end - other.v_beg);
		v_last = v_beg + capacity;
		Iterator iter_beg = other.begin();
		Iterator iter_end = other.end();
		Iterator iter_to_fill = v_beg;
		for (int i = 0; i < v_last; ++i) v_beg[i] = other[i];
		return *this;
	};
	Vector& operator =(Vector&& other) noexcept
	{
		if(this == &other) return (*this);
		delete[] v_beg;
		v_beg = other.v_beg;
		v_end = other.v_end;
		v_last = other.v_last;
		other.v_beg = nullptr;
		other.v_end = nullptr;
		other.v_last = nullptr;
		return *this;
	}
	Vector& PushBack(const _DataType& element)
	{
		if(v_last == v_end)
		{
			int capacity = (v_last - v_beg) * 2;
			if(capacity == 0) capacity = 1;
			int size = (v_end - v_beg);
			_DataType* tmpArr = new _DataType[size];
			_DataType* ptr_p = v_beg;
			_DataType* ptr = tmpArr;
			for (; ptr_p < v_end; ptr_p++) *(ptr++) = *ptr_p;
			delete[] v_beg;
			v_beg = new _DataType[capacity];
			v_end = v_beg + size;
			v_last = v_beg + capacity;
			ptr = v_beg;
			ptr_p = tmpArr;
			for (; ptr < v_end; ptr++) *ptr = *(ptr_p++);
			*v_end = element;
			v_end++;
			delete[] tmpArr;
		}
		else
		{
			*v_end = element;
			v_end++;
		}
		return *this;
	}
	template<typename... ValTy>
	void EmplaceBack(ValTy&&... _val) {
		_DataType elem(std::forward<ValTy>(_val)...);
		PushBack(std::move(elem));
	}
	bool Empty()
	{
		return (v_end == v_beg);
	}
	void PopBack() {
		if (Empty()) throw OutOfRangeException();
		_DataType* tmp = v_last;
		v_last--;
		tmp = _DataType();
	}
	_DataType* allocate(size_t p_amount = 1) {
		size_t size = v_last - v_beg;
		size_t capacity = v_end - v_beg;
		if (capacity == 0) capacity += p_amount;
		else
			while (capacity < size + p_amount) capacity *= 2;
		_DataType* tmp = new _DataType[size];
		_DataType* t_ptr = tmp;
		Iterator it(v_beg);
		for(; it != Iterator(v_end); ++it) *(t_ptr++) = *it;
		if(v_beg) delete[] v_beg;
		v_beg = new _DataType[capacity];
		v_last = v_beg + size;
		v_end = v_beg + capacity;
		return tmp;
	}
	Iterator Insert(Iterator pos, const _DataType& elem)
	{
		if(pos > end() || pos < begin()) throw OutOfRangeException();
		Iterator temp = begin();
		if(v_end == v_last)
		{
			if(Capacity() == 0) Reserve((Capacity() + 1) * 2);
			else Reserve(Capacity() * 2);
		}
		for (int it = Size() - 1; it > pos - temp; it--) v_beg[it] = v_beg[it - 1];
		v_beg[pos - temp] = elem;
		v_end++;
		return pos;
	}
	template<class iter>
	Iterator Insert(Iterator pos, iter p_beg, iter p_end)
	{
		int t = p_end - p_beg;
		int posind = pos - begin();
		_DataType* temp = new _DataType[t];
		int k = 0;
		for (iter i = p_beg; i != p_end; i++, k++) temp[k] = *i;
		(*this).Resize(Size() + t);
		for (int i = Size() - 1; i >= posind + t; i--) v_beg[i] = v_beg[i - t];
		Iterator j(temp);
		for (int i = posind; i < posind + t; i++, j++) v_beg[i] = *j;
		delete[] temp;
		return pos;
	}
	Iterator Erase(Iterator pos)
	{
		*pos = _DataType();
		Iterator beg_iter = v_beg;
		Vector tmp_before_pos(beg_iter, pos);
		Iterator end_iter = v_end;
		Iterator tmp_end_iter = tmp_before_pos.End();
		int dif = pos - v_beg;
		tmp_before_pos.Insert(tmp_end_iter, pos+1, end_iter);
		*this = tmp_before_pos;
		pos = v_beg + dif;
		return pos;
	};
	void Reserve(int n)
	{
		int capacity = n;
		int size = v_end - v_beg;
		_DataType* tmpArr = new _DataType[size];
		_DataType* ptr_p = v_beg;
		_DataType* ptr = tmpArr;
		for (; ptr_p < v_end; ptr_p++) *(ptr++) = *ptr_p;
		delete[] v_beg;
		v_beg = new _DataType[capacity];
		v_end = v_beg + size;
		v_last = v_beg + capacity;
		ptr = v_beg;
		ptr_p = tmpArr;
		for (; ptr < v_end; ptr++) *ptr = *(ptr_p++);
		delete[] tmpArr;
	}
	void Clear()
	{
		_DataType* tmp = v_beg;
		for (; tmp < v_end; tmp++) *tmp = _DataType();
	}
	void Resize(int size)
	{
		if (size > (v_last - v_beg))
		{
			(*this).Reserve(size);
			v_end = v_beg + size;
	}
	else v_end = v_beg + size;
    }
    int Size()
    {
        return (v_end - v_beg);
    }
    int Capacity()
    {
        return (v_last - v_beg);
    }
private:
	_DataType* v_beg;
	_DataType* v_end;
	_DataType* v_last;
};            
`,
        },
        {
            path: "",
            code: `
class IObserver {
    public:
    virtual ~IObserver(){};
    virtual void Update(const std::string &message_from_subject) = 0;
};
class ISubject {
public:
    virtual ~ISubject(){};
    virtual void Attach(IObserver *observer) = 0;
    virtual void Detach(IObserver *observer) = 0;
    virtual void Notify() = 0;
};   
class Subject : public ISubject {
public:
    virtual ~Subject() {
        std::cout << "Goodbye, I was the Subject.\n";
    }
    void Attach(IObserver *observer) override {
        list_observer_.push_back(observer);
    }
    void Detach(IObserver *observer) override {
        list_observer_.remove(observer);
    }
    void Notify() override {
        std::list<IObserver *>::iterator iterator = list_observer_.begin();
        HowManyObserver();
        while(iterator != list_observer_.end()) {
            (*iterator)->Update(message_);
            ++iterator;
        }
    }
    void CreateMessage(std::string message = "Empty") {
        this->message_ = message;
        Notify();
    }
    void HowManyObserver() {
        std::cout << "There are " << list_observer_.size() << " observers in the list.\n";
    }
    void SomeBusinessLogic() {
        this->message_ = "change message message";
        Notify();
        std::cout << "I'm about to do some thing important\n";
    }
private:
    std::list<IObserver *> list_observer_;
     std::string message_;
};
class Observer : public IObserver {
public:
    Observer(Subject &subject) : subject_(subject) {
        this->subject_.Attach(this);
        std::cout << "Hi, I'm the Observer \"" << ++Observer::static_number_ << "\".\n";
        this->number_ = Observer::static_number_;
    }
    virtual ~Observer() {
        std::cout << "Goodbye, I was the Observer \"" << this->number_ << "\".\n";
    }
    void Update(const std::string &message_from_subject) override {
        message_from_subject_ = message_from_subject;
        PrintInfo();
    }
    void RemoveMeFromTheList() {
        subject_.Detach(this);
        std::cout << "Observer \"" << number_ << "\" removed from the list.\n";
    }
    void PrintInfo() {
        std::cout << "Observer \"" << this->number_ << "\": a new message is available --> " << this->message_from_subject_ << "\n";
    }
private:
     std::string message_from_subject_;
     Subject &subject_;
     static int static_number_;
     int number_;
};
int Observer::static_number_ = 0;   
void ClientCode() {
    Subject *subject = new Subject;
    Observer *observer1 = new Observer(*subject);
    Observer *observer2 = new Observer(*subject);
    Observer *observer3 = new Observer(*subject);
    Observer *observer4;
    Observer *observer5;
    subject->CreateMessage("Hello World! :D");
    observer3->RemoveMeFromTheList();
    subject->CreateMessage("The weather is hot today! :p");
    observer4 = new Observer(*subject);
    observer2->RemoveMeFromTheList();
    observer5 = new Observer(*subject);
    subject->CreateMessage("My new car is great! ;)");
    observer5->RemoveMeFromTheList();
    observer4->RemoveMeFromTheList();
    observer1->RemoveMeFromTheList();
    delete observer5;
    delete observer4;
    delete observer3;
    delete observer2;
    delete observer1;
    delete subject;
}
int main() {
    ClientCode();
    return 0;
}         
`,
        },
    ],
}
