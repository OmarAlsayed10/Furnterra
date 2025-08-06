import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "./chunk-5XGGXJHF.js";
import {
  DomSanitizer
} from "./chunk-3W3EBKD2.js";
import "./chunk-GGYWUZ5Z.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-VAVNEBKD.js";
import {
  DOCUMENT,
  isPlatformServer
} from "./chunk-OX2424EP.js";
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
  ViewEncapsulation,
  forwardRef,
  require_operators,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵsanitizeHtml,
  ɵɵtemplate
} from "./chunk-LJTJGRUO.js";
import {
  require_cjs
} from "./chunk-2K3BKASH.js";
import {
  __toESM
} from "./chunk-ANGF2IQY.js";

// node_modules/ngx-quill/fesm2015/ngx-quill-config.mjs
var defaultModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{
      header: 1
    }, {
      header: 2
    }],
    [{
      list: "ordered"
    }, {
      list: "bullet"
    }],
    [{
      script: "sub"
    }, {
      script: "super"
    }],
    [{
      indent: "-1"
    }, {
      indent: "+1"
    }],
    [{
      direction: "rtl"
    }],
    [{
      size: ["small", false, "large", "huge"]
    }],
    [{
      header: [1, 2, 3, 4, 5, 6, false]
    }],
    [{
      color: []
    }, {
      background: []
    }],
    [{
      font: []
    }],
    [{
      align: []
    }],
    ["clean"],
    ["link", "image", "video"]
    // link and image, video
  ]
};
var QUILL_CONFIG_TOKEN = new InjectionToken("config", {
  providedIn: "root",
  factory: () => ({
    modules: defaultModules
  })
});
var QuillConfigModule = class _QuillConfigModule {
  static forRoot(config) {
    return {
      ngModule: _QuillConfigModule,
      providers: [{
        provide: QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
};
QuillConfigModule.ɵfac = function QuillConfigModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillConfigModule)();
};
QuillConfigModule.ɵmod = ɵɵdefineNgModule({
  type: QuillConfigModule
});
QuillConfigModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillConfigModule, [{
    type: NgModule
  }], null, null);
})();

// node_modules/ngx-quill/fesm2015/ngx-quill.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);

// node_modules/tslib/tslib.es6.mjs
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

// node_modules/ngx-quill/fesm2015/ngx-quill.mjs
var _c0 = [[["", "quill-editor-toolbar", ""]]];
var _c1 = ["[quill-editor-toolbar]"];
function QuillEditorComponent_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 2);
  }
}
function QuillEditorComponent_ng_container_0_pre_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "pre", 2);
  }
}
function QuillEditorComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, QuillEditorComponent_ng_container_0_div_1_Template, 1, 0, "div", 1)(2, QuillEditorComponent_ng_container_0_pre_2_Template, 1, 0, "pre", 1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.preserve);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.preserve);
  }
}
function QuillEditorComponent_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 2);
  }
}
function QuillEditorComponent_ng_container_2_pre_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "pre", 2);
  }
}
function QuillEditorComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, QuillEditorComponent_ng_container_2_div_1_Template, 1, 0, "div", 1)(2, QuillEditorComponent_ng_container_2_pre_2_Template, 1, 0, "pre", 1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.preserve);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.preserve);
  }
}
function QuillViewComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 1);
  }
}
function QuillViewComponent_pre_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "pre", 1);
  }
}
var getFormat = (format, configFormat) => {
  const passedFormat = format || configFormat;
  return passedFormat || "html";
};
var QuillService = class {
  constructor(injector, config) {
    this.config = config;
    this.quill$ = (0, import_rxjs.defer)(() => __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!this.Quill) {
        const maybePatchedAddEventListener = this.document.addEventListener;
        this.document.addEventListener = this.document["__zone_symbol__addEventListener"] || this.document.addEventListener;
        const quillImport = yield import("./quill-GNTYR5AD.js");
        this.document.addEventListener = maybePatchedAddEventListener;
        this.Quill = quillImport.default ? quillImport.default : quillImport;
      }
      (_a = this.config.customOptions) === null || _a === void 0 ? void 0 : _a.forEach((customOption) => {
        const newCustomOption = this.Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        this.Quill.register(newCustomOption, true, this.config.suppressGlobalRegisterWarning);
      });
      return yield this.registerCustomModules(this.Quill, this.config.customModules, this.config.suppressGlobalRegisterWarning);
    })).pipe((0, import_operators.shareReplay)({
      bufferSize: 1,
      refCount: true
    }));
    this.document = injector.get(DOCUMENT);
    if (!this.config) {
      this.config = {
        modules: defaultModules
      };
    }
  }
  getQuill() {
    return this.quill$;
  }
  /**
   * Marked as internal so it won't be available for `ngx-quill` consumers, this is only
   * internal method to be used within the library.
   *
   * @internal
   */
  registerCustomModules(Quill, customModules, suppressGlobalRegisterWarning) {
    return __awaiter(this, void 0, void 0, function* () {
      if (Array.isArray(customModules)) {
        for (let {
          implementation,
          path
        } of customModules) {
          if ((0, import_rxjs.isObservable)(implementation)) {
            implementation = yield (0, import_rxjs.firstValueFrom)(implementation);
          }
          Quill.register(path, implementation, suppressGlobalRegisterWarning);
        }
      }
      return Quill;
    });
  }
};
QuillService.ɵfac = function QuillService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillService)(ɵɵinject(Injector), ɵɵinject(QUILL_CONFIG_TOKEN, 8));
};
QuillService.ɵprov = ɵɵdefineInjectable({
  token: QuillService,
  factory: QuillService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [QUILL_CONFIG_TOKEN]
      }]
    }];
  }, null);
})();
var QuillEditorBase = class _QuillEditorBase {
  constructor(injector, elementRef, cd, domSanitizer, platformId, renderer, zone, service) {
    this.elementRef = elementRef;
    this.cd = cd;
    this.domSanitizer = domSanitizer;
    this.platformId = platformId;
    this.renderer = renderer;
    this.zone = zone;
    this.service = service;
    this.required = false;
    this.customToolbarPosition = "top";
    this.styles = null;
    this.strict = true;
    this.customOptions = [];
    this.customModules = [];
    this.preserveWhitespace = false;
    this.trimOnValidation = false;
    this.compareValues = false;
    this.filterNull = false;
    this.defaultEmptyValue = null;
    this.onEditorCreated = new EventEmitter();
    this.onEditorChanged = new EventEmitter();
    this.onContentChanged = new EventEmitter();
    this.onSelectionChanged = new EventEmitter();
    this.onFocus = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.disabled = false;
    this.preserve = false;
    this.toolbarPosition = "top";
    this.subscription = null;
    this.quillSubscription = null;
    this.valueGetter = (quillEditor, editorElement) => {
      let html = editorElement.querySelector(".ql-editor").innerHTML;
      if (html === "<p><br></p>" || html === "<div><br></div>") {
        html = this.defaultEmptyValue;
      }
      let modelValue = html;
      const format = getFormat(this.format, this.service.config.format);
      if (format === "text") {
        modelValue = quillEditor.getText();
      } else if (format === "object") {
        modelValue = quillEditor.getContents();
      } else if (format === "json") {
        try {
          modelValue = JSON.stringify(quillEditor.getContents());
        } catch (e) {
          modelValue = quillEditor.getText();
        }
      }
      return modelValue;
    };
    this.valueSetter = (quillEditor, value) => {
      const format = getFormat(this.format, this.service.config.format);
      if (format === "html") {
        const sanitize = [true, false].includes(this.sanitize) ? this.sanitize : this.service.config.sanitize || false;
        if (sanitize) {
          value = this.domSanitizer.sanitize(SecurityContext.HTML, value);
        }
        return quillEditor.clipboard.convert(value);
      } else if (format === "json") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return [{
            insert: value
          }];
        }
      }
      return value;
    };
    this.selectionChangeHandler = (range, oldRange, source) => {
      const shouldTriggerOnModelTouched = !range && !!this.onModelTouched;
      if (!this.onBlur.observed && !this.onFocus.observed && !this.onSelectionChanged.observed && !shouldTriggerOnModelTouched) {
        return;
      }
      this.zone.run(() => {
        if (range === null) {
          this.onBlur.emit({
            editor: this.quillEditor,
            source
          });
        } else if (oldRange === null) {
          this.onFocus.emit({
            editor: this.quillEditor,
            source
          });
        }
        this.onSelectionChanged.emit({
          editor: this.quillEditor,
          oldRange,
          range,
          source
        });
        if (shouldTriggerOnModelTouched) {
          this.onModelTouched();
        }
        this.cd.markForCheck();
      });
    };
    this.textChangeHandler = (delta, oldDelta, source) => {
      const text = this.quillEditor.getText();
      const content = this.quillEditor.getContents();
      let html = this.editorElem.querySelector(".ql-editor").innerHTML;
      if (html === "<p><br></p>" || html === "<div><br></div>") {
        html = this.defaultEmptyValue;
      }
      const trackChanges = this.trackChanges || this.service.config.trackChanges;
      const shouldTriggerOnModelChange = (source === "user" || trackChanges && trackChanges === "all") && !!this.onModelChange;
      if (!this.onContentChanged.observed && !shouldTriggerOnModelChange) {
        return;
      }
      this.zone.run(() => {
        if (shouldTriggerOnModelChange) {
          this.onModelChange(this.valueGetter(this.quillEditor, this.editorElem));
        }
        this.onContentChanged.emit({
          content,
          delta,
          editor: this.quillEditor,
          html,
          oldDelta,
          source,
          text
        });
        this.cd.markForCheck();
      });
    };
    this.editorChangeHandler = (event, current, old, source) => {
      if (!this.onEditorChanged.observed) {
        return;
      }
      if (event === "text-change") {
        const text = this.quillEditor.getText();
        const content = this.quillEditor.getContents();
        let html = this.editorElem.querySelector(".ql-editor").innerHTML;
        if (html === "<p><br></p>" || html === "<div><br></div>") {
          html = this.defaultEmptyValue;
        }
        this.zone.run(() => {
          this.onEditorChanged.emit({
            content,
            delta: current,
            editor: this.quillEditor,
            event,
            html,
            oldDelta: old,
            source,
            text
          });
          this.cd.markForCheck();
        });
      } else {
        this.zone.run(() => {
          this.onEditorChanged.emit({
            editor: this.quillEditor,
            event,
            oldRange: old,
            range: current,
            source
          });
          this.cd.markForCheck();
        });
      }
    };
    this.document = injector.get(DOCUMENT);
  }
  static normalizeClassNames(classes) {
    const classList = classes.trim().split(" ");
    return classList.reduce((prev, cur) => {
      const trimmed = cur.trim();
      if (trimmed) {
        prev.push(trimmed);
      }
      return prev;
    }, []);
  }
  ngOnInit() {
    this.preserve = this.preserveWhitespace;
    this.toolbarPosition = this.customToolbarPosition;
  }
  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.quillSubscription = this.service.getQuill().pipe((0, import_operators.mergeMap)((Quill) => {
      var _a;
      const promises = [this.service.registerCustomModules(Quill, this.customModules)];
      const beforeRender = (_a = this.beforeRender) !== null && _a !== void 0 ? _a : this.service.config.beforeRender;
      if (beforeRender) {
        promises.push(beforeRender());
      }
      return Promise.all(promises).then(() => Quill);
    })).subscribe((Quill) => {
      this.editorElem = this.elementRef.nativeElement.querySelector("[quill-editor-element]");
      const toolbarElem = this.elementRef.nativeElement.querySelector("[quill-editor-toolbar]");
      const modules = Object.assign({}, this.modules || this.service.config.modules);
      if (toolbarElem) {
        modules.toolbar = toolbarElem;
      } else if (modules.toolbar === void 0) {
        modules.toolbar = defaultModules.toolbar;
      }
      let placeholder = this.placeholder !== void 0 ? this.placeholder : this.service.config.placeholder;
      if (placeholder === void 0) {
        placeholder = "Insert text here ...";
      }
      if (this.styles) {
        Object.keys(this.styles).forEach((key) => {
          this.renderer.setStyle(this.editorElem, key, this.styles[key]);
        });
      }
      if (this.classes) {
        this.addClasses(this.classes);
      }
      this.customOptions.forEach((customOption) => {
        const newCustomOption = Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        Quill.register(newCustomOption, true);
      });
      let bounds = this.bounds && this.bounds === "self" ? this.editorElem : this.bounds;
      if (!bounds) {
        bounds = this.service.config.bounds ? this.service.config.bounds : this.document.body;
      }
      let debug = this.debug;
      if (!debug && debug !== false && this.service.config.debug) {
        debug = this.service.config.debug;
      }
      let readOnly = this.readOnly;
      if (!readOnly && this.readOnly !== false) {
        readOnly = this.service.config.readOnly !== void 0 ? this.service.config.readOnly : false;
      }
      let defaultEmptyValue = this.defaultEmptyValue;
      if (this.service.config.hasOwnProperty("defaultEmptyValue")) {
        defaultEmptyValue = this.service.config.defaultEmptyValue;
      }
      let scrollingContainer = this.scrollingContainer;
      if (!scrollingContainer && this.scrollingContainer !== null) {
        scrollingContainer = this.service.config.scrollingContainer === null || this.service.config.scrollingContainer ? this.service.config.scrollingContainer : null;
      }
      let formats = this.formats;
      if (!formats && formats === void 0) {
        formats = this.service.config.formats ? [...this.service.config.formats] : this.service.config.formats === null ? null : void 0;
      }
      this.zone.runOutsideAngular(() => {
        var _a, _b, _c;
        this.quillEditor = new Quill(this.editorElem, {
          bounds,
          debug,
          formats,
          modules,
          placeholder,
          readOnly,
          defaultEmptyValue,
          scrollingContainer,
          strict: this.strict,
          theme: this.theme || (this.service.config.theme ? this.service.config.theme : "snow")
        });
        if (this.linkPlaceholder) {
          const tooltip = (_b = (_a = this.quillEditor) === null || _a === void 0 ? void 0 : _a.theme) === null || _b === void 0 ? void 0 : _b.tooltip;
          const input = (_c = tooltip === null || tooltip === void 0 ? void 0 : tooltip.root) === null || _c === void 0 ? void 0 : _c.querySelector("input[data-link]");
          if (input === null || input === void 0 ? void 0 : input.dataset) {
            input.dataset.link = this.linkPlaceholder;
          }
        }
      });
      if (this.content) {
        const format = getFormat(this.format, this.service.config.format);
        if (format === "text") {
          this.quillEditor.setText(this.content, "silent");
        } else {
          const newValue = this.valueSetter(this.quillEditor, this.content);
          this.quillEditor.setContents(newValue, "silent");
        }
        this.quillEditor.getModule("history").clear();
      }
      this.setDisabledState();
      this.addQuillEventListeners();
      if (!this.onEditorCreated.observed && !this.onValidatorChanged) {
        return;
      }
      requestAnimationFrame(() => {
        if (this.onValidatorChanged) {
          this.onValidatorChanged();
        }
        this.onEditorCreated.emit(this.quillEditor);
        this.onEditorCreated.complete();
      });
    });
  }
  ngOnDestroy() {
    var _a;
    this.dispose();
    (_a = this.quillSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    this.quillSubscription = null;
  }
  ngOnChanges(changes) {
    if (!this.quillEditor) {
      return;
    }
    if (changes.readOnly) {
      this.quillEditor.enable(!changes.readOnly.currentValue);
    }
    if (changes.placeholder) {
      this.quillEditor.root.dataset.placeholder = changes.placeholder.currentValue;
    }
    if (changes.defaultEmptyValue) {
      this.quillEditor.root.dataset.defaultEmptyValue = changes.defaultEmptyValue.currentValue;
    }
    if (changes.styles) {
      const currentStyling = changes.styles.currentValue;
      const previousStyling = changes.styles.previousValue;
      if (previousStyling) {
        Object.keys(previousStyling).forEach((key) => {
          this.renderer.removeStyle(this.editorElem, key);
        });
      }
      if (currentStyling) {
        Object.keys(currentStyling).forEach((key) => {
          this.renderer.setStyle(this.editorElem, key, this.styles[key]);
        });
      }
    }
    if (changes.classes) {
      const currentClasses = changes.classes.currentValue;
      const previousClasses = changes.classes.previousValue;
      if (previousClasses) {
        this.removeClasses(previousClasses);
      }
      if (currentClasses) {
        this.addClasses(currentClasses);
      }
    }
    if (changes.debounceTime) {
      this.addQuillEventListeners();
    }
  }
  addClasses(classList) {
    _QuillEditorBase.normalizeClassNames(classList).forEach((c) => {
      this.renderer.addClass(this.editorElem, c);
    });
  }
  removeClasses(classList) {
    _QuillEditorBase.normalizeClassNames(classList).forEach((c) => {
      this.renderer.removeClass(this.editorElem, c);
    });
  }
  writeValue(currentValue) {
    if (this.filterNull && currentValue === null) {
      return;
    }
    this.content = currentValue;
    if (!this.quillEditor) {
      return;
    }
    const format = getFormat(this.format, this.service.config.format);
    const newValue = this.valueSetter(this.quillEditor, currentValue);
    if (this.compareValues) {
      const currentEditorValue = this.quillEditor.getContents();
      if (JSON.stringify(currentEditorValue) === JSON.stringify(newValue)) {
        return;
      }
    }
    if (currentValue) {
      if (format === "text") {
        this.quillEditor.setText(currentValue);
      } else {
        this.quillEditor.setContents(newValue);
      }
      return;
    }
    this.quillEditor.setText("");
  }
  setDisabledState(isDisabled = this.disabled) {
    this.disabled = isDisabled;
    if (this.quillEditor) {
      if (isDisabled) {
        this.quillEditor.disable();
        this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", "disabled");
      } else {
        if (!this.readOnly) {
          this.quillEditor.enable();
        }
        this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
      }
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  registerOnValidatorChange(fn) {
    this.onValidatorChanged = fn;
  }
  validate() {
    if (!this.quillEditor) {
      return null;
    }
    const err = {};
    let valid = true;
    const text = this.quillEditor.getText();
    const textLength = this.trimOnValidation ? text.trim().length : text.length === 1 && text.trim().length === 0 ? 0 : text.length - 1;
    const deltaOperations = this.quillEditor.getContents().ops;
    const onlyEmptyOperation = deltaOperations && deltaOperations.length === 1 && ["\n", ""].includes(deltaOperations[0].insert);
    if (this.minLength && textLength && textLength < this.minLength) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength
      };
      valid = false;
    }
    if (this.maxLength && textLength > this.maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength
      };
      valid = false;
    }
    if (this.required && !textLength && onlyEmptyOperation) {
      err.requiredError = {
        empty: true
      };
      valid = false;
    }
    return valid ? null : err;
  }
  addQuillEventListeners() {
    this.dispose();
    this.zone.runOutsideAngular(() => {
      this.subscription = new import_rxjs.Subscription();
      this.subscription.add(
        // mark model as touched if editor lost focus
        (0, import_rxjs.fromEvent)(this.quillEditor, "selection-change").subscribe(([range, oldRange, source]) => {
          this.selectionChangeHandler(range, oldRange, source);
        })
      );
      let textChange$ = (0, import_rxjs.fromEvent)(this.quillEditor, "text-change");
      let editorChange$ = (0, import_rxjs.fromEvent)(this.quillEditor, "editor-change");
      if (typeof this.debounceTime === "number") {
        textChange$ = textChange$.pipe((0, import_operators.debounceTime)(this.debounceTime));
        editorChange$ = editorChange$.pipe((0, import_operators.debounceTime)(this.debounceTime));
      }
      this.subscription.add(
        // update model if text changes
        textChange$.subscribe(([delta, oldDelta, source]) => {
          this.textChangeHandler(delta, oldDelta, source);
        })
      );
      this.subscription.add(
        // triggered if selection or text changed
        editorChange$.subscribe(([event, current, old, source]) => {
          this.editorChangeHandler(event, current, old, source);
        })
      );
    });
  }
  dispose() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
};
QuillEditorBase.ɵfac = function QuillEditorBase_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillEditorBase)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DomSanitizer), ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(QuillService));
};
QuillEditorBase.ɵdir = ɵɵdefineDirective({
  type: QuillEditorBase,
  inputs: {
    format: "format",
    theme: "theme",
    modules: "modules",
    debug: "debug",
    readOnly: "readOnly",
    placeholder: "placeholder",
    maxLength: "maxLength",
    minLength: "minLength",
    required: "required",
    formats: "formats",
    customToolbarPosition: "customToolbarPosition",
    sanitize: "sanitize",
    beforeRender: "beforeRender",
    styles: "styles",
    strict: "strict",
    scrollingContainer: "scrollingContainer",
    bounds: "bounds",
    customOptions: "customOptions",
    customModules: "customModules",
    trackChanges: "trackChanges",
    preserveWhitespace: "preserveWhitespace",
    classes: "classes",
    trimOnValidation: "trimOnValidation",
    linkPlaceholder: "linkPlaceholder",
    compareValues: "compareValues",
    filterNull: "filterNull",
    debounceTime: "debounceTime",
    defaultEmptyValue: "defaultEmptyValue",
    valueGetter: "valueGetter",
    valueSetter: "valueSetter"
  },
  outputs: {
    onEditorCreated: "onEditorCreated",
    onEditorChanged: "onEditorChanged",
    onContentChanged: "onContentChanged",
    onSelectionChanged: "onSelectionChanged",
    onFocus: "onFocus",
    onBlur: "onBlur"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillEditorBase, [{
    type: Directive
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }, {
      type: ChangeDetectorRef
    }, {
      type: DomSanitizer
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2
    }, {
      type: NgZone
    }, {
      type: QuillService
    }];
  }, {
    format: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    modules: [{
      type: Input
    }],
    debug: [{
      type: Input
    }],
    readOnly: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    maxLength: [{
      type: Input
    }],
    minLength: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    formats: [{
      type: Input
    }],
    customToolbarPosition: [{
      type: Input
    }],
    sanitize: [{
      type: Input
    }],
    beforeRender: [{
      type: Input
    }],
    styles: [{
      type: Input
    }],
    strict: [{
      type: Input
    }],
    scrollingContainer: [{
      type: Input
    }],
    bounds: [{
      type: Input
    }],
    customOptions: [{
      type: Input
    }],
    customModules: [{
      type: Input
    }],
    trackChanges: [{
      type: Input
    }],
    preserveWhitespace: [{
      type: Input
    }],
    classes: [{
      type: Input
    }],
    trimOnValidation: [{
      type: Input
    }],
    linkPlaceholder: [{
      type: Input
    }],
    compareValues: [{
      type: Input
    }],
    filterNull: [{
      type: Input
    }],
    debounceTime: [{
      type: Input
    }],
    defaultEmptyValue: [{
      type: Input
    }],
    onEditorCreated: [{
      type: Output
    }],
    onEditorChanged: [{
      type: Output
    }],
    onContentChanged: [{
      type: Output
    }],
    onSelectionChanged: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    valueGetter: [{
      type: Input
    }],
    valueSetter: [{
      type: Input
    }]
  });
})();
var QuillEditorComponent = class extends QuillEditorBase {
  constructor(injector, elementRef, cd, domSanitizer, platformId, renderer, zone, service) {
    super(injector, elementRef, cd, domSanitizer, platformId, renderer, zone, service);
  }
};
QuillEditorComponent.ɵfac = function QuillEditorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillEditorComponent)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DomSanitizer), ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(QuillService));
};
QuillEditorComponent.ɵcmp = ɵɵdefineComponent({
  type: QuillEditorComponent,
  selectors: [["quill-editor"]],
  features: [ɵɵProvidersFeature([{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => QuillEditorComponent)
  }, {
    multi: true,
    provide: NG_VALIDATORS,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => QuillEditorComponent)
  }]), ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 3,
  vars: 2,
  consts: [[4, "ngIf"], ["quill-editor-element", "", 4, "ngIf"], ["quill-editor-element", ""]],
  template: function QuillEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵtemplate(0, QuillEditorComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
      ɵɵprojection(1);
      ɵɵtemplate(2, QuillEditorComponent_ng_container_2_Template, 3, 2, "ng-container", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.toolbarPosition !== "top");
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.toolbarPosition === "top");
    }
  },
  dependencies: [CommonModule, NgIf],
  styles: ["[_nghost-%COMP%]{display:inline-block}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillEditorComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.Emulated,
      providers: [{
        multi: true,
        provide: NG_VALUE_ACCESSOR,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        useExisting: forwardRef(() => QuillEditorComponent)
      }, {
        multi: true,
        provide: NG_VALIDATORS,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        useExisting: forwardRef(() => QuillEditorComponent)
      }],
      selector: "quill-editor",
      template: `
  <ng-container *ngIf="toolbarPosition !== 'top'">
    <div quill-editor-element *ngIf="!preserve"></div>
    <pre quill-editor-element *ngIf="preserve"></pre>
  </ng-container>
  <ng-content select="[quill-editor-toolbar]"></ng-content>
  <ng-container *ngIf="toolbarPosition === 'top'">
    <div quill-editor-element *ngIf="!preserve"></div>
    <pre quill-editor-element *ngIf="preserve"></pre>
  </ng-container>
`,
      standalone: true,
      imports: [CommonModule],
      styles: [":host{display:inline-block}\n"]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef,
      decorators: [{
        type: Inject,
        args: [ElementRef]
      }]
    }, {
      type: ChangeDetectorRef,
      decorators: [{
        type: Inject,
        args: [ChangeDetectorRef]
      }]
    }, {
      type: DomSanitizer,
      decorators: [{
        type: Inject,
        args: [DomSanitizer]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2,
      decorators: [{
        type: Inject,
        args: [Renderer2]
      }]
    }, {
      type: NgZone,
      decorators: [{
        type: Inject,
        args: [NgZone]
      }]
    }, {
      type: QuillService,
      decorators: [{
        type: Inject,
        args: [QuillService]
      }]
    }];
  }, null);
})();
var QuillViewHTMLComponent = class {
  constructor(sanitizer, service) {
    this.sanitizer = sanitizer;
    this.service = service;
    this.content = "";
    this.innerHTML = "";
    this.themeClass = "ql-snow";
  }
  ngOnChanges(changes) {
    if (changes.theme) {
      const theme = changes.theme.currentValue || (this.service.config.theme ? this.service.config.theme : "snow");
      this.themeClass = `ql-${theme} ngx-quill-view-html`;
    } else if (!this.theme) {
      const theme = this.service.config.theme ? this.service.config.theme : "snow";
      this.themeClass = `ql-${theme} ngx-quill-view-html`;
    }
    if (changes.content) {
      const content = changes.content.currentValue;
      const sanitize = [true, false].includes(this.sanitize) ? this.sanitize : this.service.config.sanitize || false;
      this.innerHTML = sanitize ? content : this.sanitizer.bypassSecurityTrustHtml(content);
    }
  }
};
QuillViewHTMLComponent.ɵfac = function QuillViewHTMLComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillViewHTMLComponent)(ɵɵdirectiveInject(DomSanitizer), ɵɵdirectiveInject(QuillService));
};
QuillViewHTMLComponent.ɵcmp = ɵɵdefineComponent({
  type: QuillViewHTMLComponent,
  selectors: [["quill-view-html"]],
  inputs: {
    content: "content",
    theme: "theme",
    sanitize: "sanitize"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 2,
  vars: 2,
  consts: [[1, "ql-container", 3, "ngClass"], [1, "ql-editor", 3, "innerHTML"]],
  template: function QuillViewHTMLComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵelement(1, "div", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ctx.themeClass);
      ɵɵadvance();
      ɵɵproperty("innerHTML", ctx.innerHTML, ɵɵsanitizeHtml);
    }
  },
  dependencies: [CommonModule, NgClass],
  styles: [".ql-container.ngx-quill-view-html{border:0}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillViewHTMLComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      selector: "quill-view-html",
      template: `
  <div class="ql-container" [ngClass]="themeClass">
    <div class="ql-editor" [innerHTML]="innerHTML">
    </div>
  </div>
`,
      standalone: true,
      imports: [CommonModule],
      styles: [".ql-container.ngx-quill-view-html{border:0}\n"]
    }]
  }], function() {
    return [{
      type: DomSanitizer,
      decorators: [{
        type: Inject,
        args: [DomSanitizer]
      }]
    }, {
      type: QuillService
    }];
  }, {
    content: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    sanitize: [{
      type: Input
    }]
  });
})();
var QuillViewComponent = class {
  constructor(elementRef, renderer, zone, service, domSanitizer, platformId) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.zone = zone;
    this.service = service;
    this.domSanitizer = domSanitizer;
    this.platformId = platformId;
    this.strict = true;
    this.customModules = [];
    this.customOptions = [];
    this.preserveWhitespace = false;
    this.onEditorCreated = new EventEmitter();
    this.preserve = false;
    this.quillSubscription = null;
    this.valueSetter = (quillEditor, value) => {
      const format = getFormat(this.format, this.service.config.format);
      let content = value;
      if (format === "text") {
        quillEditor.setText(content);
      } else {
        if (format === "html") {
          const sanitize = [true, false].includes(this.sanitize) ? this.sanitize : this.service.config.sanitize || false;
          if (sanitize) {
            value = this.domSanitizer.sanitize(SecurityContext.HTML, value);
          }
          content = quillEditor.clipboard.convert(value);
        } else if (format === "json") {
          try {
            content = JSON.parse(value);
          } catch (e) {
            content = [{
              insert: value
            }];
          }
        }
        quillEditor.setContents(content);
      }
    };
  }
  ngOnInit() {
    this.preserve = this.preserveWhitespace;
  }
  ngOnChanges(changes) {
    if (!this.quillEditor) {
      return;
    }
    if (changes.content) {
      this.valueSetter(this.quillEditor, changes.content.currentValue);
    }
  }
  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.quillSubscription = this.service.getQuill().pipe((0, import_operators.mergeMap)((Quill) => {
      var _a;
      const promises = [this.service.registerCustomModules(Quill, this.customModules)];
      const beforeRender = (_a = this.beforeRender) !== null && _a !== void 0 ? _a : this.service.config.beforeRender;
      if (beforeRender) {
        promises.push(beforeRender());
      }
      return Promise.all(promises).then(() => Quill);
    })).subscribe((Quill) => {
      const modules = Object.assign({}, this.modules || this.service.config.modules);
      modules.toolbar = false;
      this.customOptions.forEach((customOption) => {
        const newCustomOption = Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        Quill.register(newCustomOption, true);
      });
      let debug = this.debug;
      if (!debug && debug !== false && this.service.config.debug) {
        debug = this.service.config.debug;
      }
      let formats = this.formats;
      if (!formats && formats === void 0) {
        formats = this.service.config.formats ? Object.assign({}, this.service.config.formats) : this.service.config.formats === null ? null : void 0;
      }
      const theme = this.theme || (this.service.config.theme ? this.service.config.theme : "snow");
      this.editorElem = this.elementRef.nativeElement.querySelector("[quill-view-element]");
      this.zone.runOutsideAngular(() => {
        this.quillEditor = new Quill(this.editorElem, {
          debug,
          formats,
          modules,
          readOnly: true,
          strict: this.strict,
          theme
        });
      });
      this.renderer.addClass(this.editorElem, "ngx-quill-view");
      if (this.content) {
        this.valueSetter(this.quillEditor, this.content);
      }
      if (!this.onEditorCreated.observers.length) {
        return;
      }
      requestAnimationFrame(() => {
        this.onEditorCreated.emit(this.quillEditor);
        this.onEditorCreated.complete();
      });
    });
  }
  ngOnDestroy() {
    var _a;
    (_a = this.quillSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    this.quillSubscription = null;
  }
};
QuillViewComponent.ɵfac = function QuillViewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillViewComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(QuillService), ɵɵdirectiveInject(DomSanitizer), ɵɵdirectiveInject(PLATFORM_ID));
};
QuillViewComponent.ɵcmp = ɵɵdefineComponent({
  type: QuillViewComponent,
  selectors: [["quill-view"]],
  inputs: {
    format: "format",
    theme: "theme",
    modules: "modules",
    debug: "debug",
    formats: "formats",
    sanitize: "sanitize",
    beforeRender: "beforeRender",
    strict: "strict",
    content: "content",
    customModules: "customModules",
    customOptions: "customOptions",
    preserveWhitespace: "preserveWhitespace"
  },
  outputs: {
    onEditorCreated: "onEditorCreated"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 2,
  vars: 2,
  consts: [["quill-view-element", "", 4, "ngIf"], ["quill-view-element", ""]],
  template: function QuillViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, QuillViewComponent_div_0_Template, 1, 0, "div", 0)(1, QuillViewComponent_pre_1_Template, 1, 0, "pre", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", !ctx.preserve);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.preserve);
    }
  },
  dependencies: [CommonModule, NgIf],
  styles: [".ql-container.ngx-quill-view{border:0}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillViewComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      selector: "quill-view",
      template: `
<div quill-view-element *ngIf="!preserve"></div>
<pre quill-view-element *ngIf="preserve"></pre>
`,
      standalone: true,
      imports: [CommonModule],
      styles: [".ql-container.ngx-quill-view{border:0}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: NgZone
    }, {
      type: QuillService
    }, {
      type: DomSanitizer
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, {
    format: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    modules: [{
      type: Input
    }],
    debug: [{
      type: Input
    }],
    formats: [{
      type: Input
    }],
    sanitize: [{
      type: Input
    }],
    beforeRender: [{
      type: Input
    }],
    strict: [{
      type: Input
    }],
    content: [{
      type: Input
    }],
    customModules: [{
      type: Input
    }],
    customOptions: [{
      type: Input
    }],
    preserveWhitespace: [{
      type: Input
    }],
    onEditorCreated: [{
      type: Output
    }]
  });
})();
var QuillModule = class _QuillModule {
  static forRoot(config) {
    return {
      ngModule: _QuillModule,
      providers: [{
        provide: QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
};
QuillModule.ɵfac = function QuillModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QuillModule)();
};
QuillModule.ɵmod = ɵɵdefineNgModule({
  type: QuillModule,
  imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
  exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
});
QuillModule.ɵinj = ɵɵdefineInjector({
  imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillModule, [{
    type: NgModule,
    args: [{
      imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
      exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
    }]
  }], null, null);
})();
export {
  QUILL_CONFIG_TOKEN,
  QuillConfigModule,
  QuillEditorBase,
  QuillEditorComponent,
  QuillModule,
  QuillService,
  QuillViewComponent,
  QuillViewHTMLComponent,
  defaultModules
};
//# sourceMappingURL=ngx-quill.js.map
